module.exports = {
  name: `pin-deps`,
  factory: (require) => {
    const { Command } = require(`clipanion`);

    const core = require(`@yarnpkg/core`);
    const semver = require(`semver`);

    const {
      Cache,
      Project,
      Configuration,
      ThrowReport,
      StreamReport,
      semverUtils,
      structUtils,
      Manifest,
    } = core;
    const { getPluginConfiguration } = require("@yarnpkg/cli");
    const { ppath } = require("@yarnpkg/fslib");

    const green = (text) => `\x1b[32m${text}\x1b[0m`;

    class PinDepsCommand extends Command {
      async execute() {
        this.configuration = await Configuration.find(
          this.context.cwd,
          getPluginConfiguration()
        );

        const { project } = await Project.find(
          this.configuration,
          this.context.cwd
        );

        this.project = project;

        this.cache = await Cache.find(this.configuration);

        await this.project.resolveEverything({
          cache: this.cache,
          report: new ThrowReport(),
        });

        const locatorsByIdent = new Map();
        for (const [
          descriptorHash,
          locatorHash,
        ] of this.project.storedResolutions.entries()) {
          const value = locatorHash;

          const descriptor = this.project.storedDescriptors.get(descriptorHash);
          const key = descriptor.identHash;

          const locators = locatorsByIdent.get(key);
          if (locators === undefined) {
            locatorsByIdent.set(key, new Set([value]));
          } else {
            locatorsByIdent.set(key, locators.add(value));
          }
        }

        this.locatorsByIdent = locatorsByIdent;

        await StreamReport.start(
          {
            configuration: this.configuration,
            stdout: this.context.stdout,
            includeLogs: true,
            json: false,
          },
          async (streamReport) => {
            this.log = streamReport;
            await this.findPinnableDependencies();
            await this.pinDependencies();
          }
        );
      }

      async pinDependencies() {
        this.log.reportJson({
          type: `info`,
          name: `pinnableDependencies`,
          displayName: `pinnableDependencies`,
          data: this.pinnableJSON,
        });

        for (const workspace of this.project.workspaces) {
          const { manifest, cwd: workspaceCwd } = workspace;
          const needsPinning = this.pinnableByWorkspaceCwd.get(workspaceCwd);

          let numPinned = 0;
          for (const [identHash, { version }] of needsPinning) {
            let curValue = manifest.dependencies.get(identHash);

            if (curValue.range === version) {
              continue;
            }

            manifest.dependencies.set(
              identHash,
              Object.assign(manifest.dependencies.get(identHash), {
                range: version,
              })
            );

            numPinned = numPinned + 1;
          }

          let needsPersist = numPinned > 0;

          if (needsPersist) {
            if (!this.dryRun) {
              await workspace.persistManifest();
            }

            let manifestPath = ppath.join(workspaceCwd, Manifest.fileName);
            this.log.reportInfo(
              null,
              `${green(`✓`)} Pinned ${numPinned}, wrote to ${manifestPath}`
            );
          }
        }
      }

      async findPinnableDependencies() {
        const { workspaces } = this.project;

        this.pinnableByWorkspaceCwd = new Map();

        // simplified version of pinnableByWorkspaceCwd, for reporting
        // name:range -> version
        this.reportablePinsByWorkspaceCwd = new Map();

        for (let {
          manifest: { dependencies },
          cwd: workspaceCwd,
        } of workspaces) {
          let pinnableInWorkspace = new Map();
          this.pinnableByWorkspaceCwd.set(workspaceCwd, pinnableInWorkspace);

          let reportablePinsInWorkspace = new Map();
          this.reportablePinsByWorkspaceCwd.set(
            workspaceCwd,
            reportablePinsInWorkspace
          );

          for (const [identHash, dependency] of dependencies) {
            const { name, range } = dependency;
            if (!PinDepsCommand.needsPin(range)) {
              this.log.reportWarning(
                `${workspaceCwd}`,
                `Skip: ${name}:${range}`
              );
              continue;
            }

            const semverMatch = range.match(/^(.*)$/);

            if (semverMatch === null) {
              this.log.reportWarning(
                `${workspaceCwd}`,
                `No semverMatch: ${name}:${range}`
              );
              continue;
            }

            // Adapt logic for package locator lookup from deduplicate plugin:
            // https://github.com/yarnplugins/yarn-plugin-deduplicate

            const locatorHashes = this.locatorsByIdent.get(identHash);

            let pinTo;
            if (locatorHashes !== undefined && locatorHashes.size > 1) {
              const candidates = Array.from(locatorHashes)
                .map((locatorHash) => {
                  const pkg = this.project.storedPackages.get(locatorHash);
                  if (pkg === undefined) {
                    throw new TypeError(
                      `Can't find package for locator hash '${locatorHash}'`
                    );
                  }
                  if (structUtils.isVirtualLocator(pkg)) {
                    const sourceLocator = structUtils.devirtualizeLocator(pkg);
                    return this.project.storedPackages.get(
                      sourceLocator.locatorHash
                    );
                  }

                  return pkg;
                })
                .filter((sourcePackage) => {
                  if (sourcePackage.version === null) return false;

                  return semver.satisfies(
                    sourcePackage.version,
                    semverMatch[1]
                  );
                })
                .sort((a, b) => {
                  return semver.gt(a.version, b.version) ? -1 : 1;
                });

              if (candidates.length > 1) {
                // https://stackoverflow.com/questions/22566379
                const candidatePairs = candidates
                  .map((v, i) => candidates.slice(i + 1).map((w) => [v, w]))
                  .flat();

                let numDupes = 0;
                for (let [candidateA, candidateB] of candidatePairs) {
                  if (!structUtils.areLocatorsEqual(candidateA, candidateB)) {
                    numDupes = numDupes + 1;
                  }
                }

                if (numDupes > 0) {
                  this.log.reportWarningOnce(
                    `${workspaceCwd}`,
                    `Possible duplicate: ${name} has ${candidates.length} candidates (${numDupes} conflicting pairs)`
                  );
                }
              }

              pinTo = this.project.storedPackages.get(
                candidates[0].locatorHash
              );
            } else if (locatorHashes.size === 1) {
              pinTo = this.project.storedPackages.get(
                Array.from(locatorHashes)[0]
              );
            } else {
              this.log.reportWarning(
                `${workspaceCwd}`,
                `Missing locator: ${name}:${range}`
              );
            }

            if (pinTo.version === range) {
              this.log.reportWarning(
                `${workspaceCwd}`,
                `already pinned ${name}:${range} to ${pinTo.version}`
              );
            } else {
              pinnableInWorkspace.set(identHash, pinTo);
              reportablePinsInWorkspace.set(`${name}:${range}`, pinTo.version);

              this.log.reportInfo(
                `${workspaceCwd}`,
                `will pin ${name}:${range} to ${pinTo.version} in ${workspaceCwd}`
              );
            }
          }
        }
      }

      get pinnableJSON() {
        // https://stackoverflow.com/questions/57611237
        const toObject = (map = new Map()) =>
          Object.fromEntries(
            Array.from(map.entries(), ([k, v]) =>
              v instanceof Map ? [k, toObject(v)] : [k, v]
            )
          );

        return toObject(this.reportablePinsByWorkspaceCwd);
      }

      static needsPin(range) {
        if (!semverUtils.validRange(range)) {
          return false;
        }

        return true;
      }
    }

    // Similarly we would be able to use a decorator here too, but since
    // we're writing our code in JS-only we need to go through "addPath".
    PinDepsCommand.addPath(`pin-deps`);

    PinDepsCommand.addOption(
      `dryRun`,
      Command.Boolean("--dry", false, {
        description: `Print the changes to stdout but do not apply them to package.json files.`,
      })
    );

    // Show descriptive usage for a --help argument passed to this command
    PinDepsCommand.usage = Command.Usage({
      description: `pin-deps [--dry]`,
      details: `
        Pin any unpinned dependencies to their currently resolved version.
      `,
      examples: [[`Print changes without applying them`, `pin-deps --dry`]],
    });

    return {
      commands: [PinDepsCommand],
    };
  },
};
