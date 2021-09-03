# Quick Start

As of 7/8/21, these instructions should get you running locally. It's still a WIP.

**NOTE: Make sure you check out `canary` of this repository! The default `master` branch is not up to date.**

<details><summary>Installation and Setup
</summary><p>

## Cloning

You can get started by copying this command and pasting it into your Terminal:

```bash
git clone git@github.com:splitgraph/splitgraph.com.git \
  && cd splitgraph.com \
  && git checkout --track origin/canary
```

## Installation

Assumptions:

- Linux host, preferably running Ubuntu 18.04 (that's what CI uses)
- Node 15.x or higher (15 is deprecated; 16 likely works; CI only tests with Node 15)
- `yarn` installed ("yarn classic" is okay – it can upgrade to yarn berry)

When in doubt, you can read read the CI scripts, you can check the CI scripts, since we know it's passing:

- [.github/workflows/build_and_deploy_preview.yml](.github/workflows/build_and_deploy_preview.yml)
- [.ci/install.sh](.ci/install.sh)
- [.ci/build.sh](.ci/build.sh)

Here is how you install the repository for the first time.

```bash
# Export this variable so yarn knows to use our plugin (todo: remove this step)
export WORKSPACE_LOCKFILE=yarn-public-workspace.lock

# Run the setup script to ensure correct verson of yarn berry and plugins
# On success, the script will print nothing, and exit 0
./setup.sh

# Install all workspaces
yarn install --immutable
```

To verify it worked, check that `node_modules` exists:

```bash
ls node_modules | head -n5
```

Troubleshooting:

- Make sure you're running the correct `yarn`. If not, run `./setup.sh` again.
  - `yarn --version` should print `2.4.2`
  - `yarn config get nodeLinker` should print `node-modules`
- `./setup.sh` exits with failure and hopefully prints some information
  - Try to do what it says
- Make sure `node --version` is at least `15.x`
  - Node `16.x` is also likely to work, but it is untested; CI only tests `15.x`
  - Any version lower than `15.x` is unlikely to work
- Directory permission errors
  - Make sure you own the current directory and any existing `node_modules` subdirectory

</p></details>

<details><summary>Developing
</summary><p>

## Note!

**Run all `yarn` commands in the root workspace, unless otherwise specified.**

## Typecheck

**Note: This part is a bit rough around the edges for local dev right now.**

After install, you should run a typecheck to make sure everything is working
as expected (also, it might be required for `yarn dev` to work, but not sure atm).

```bash
# (1) Prep environment with temporary hack
# By default the `tsconfig.json` will not run in an isolated repo, so you
# need to overwrite it with the same config used in CI.
# Note:
#   - this is a TEMPORARY HACK.
#   - This will result in a changed file in Git. DO NOT COMMIT THE CHANGED TSCONFIG FILES.
mv tsconfig.ci.json tsconfig.json

# (2) Run typecheck
# This will take max 2 minutes on the first run but will use incremental builds afterward
yarn typecheck
```

Troubleshooting:

- Just skip this if it's broken right now

## Start the dev server

Assuming typechecking passed, this should go smoothly:

```
yarn dev
```

This will start the Next.js dev server. Navigate to the demo page:

- http://localhost:3000/docs/lp

If it loads, great!

## Edit the right files

To get started, you can try editing the demo `lp` page linked above.

- The Next.js app is in the `docs` workspace
- To edit the `lp` page in the above link, edit: [docs/pages/docs/lp/index.tsx](./docs/pages/docs/lp/index.tsx)
- Note this page imports demo components from [`docs/components/DemoComponents`](./docs/components/DemoComponents)
- Import the theme and/or components from `@splitgraph/tdesign` (the `tdesign` workspace)

For the most part, this is a standard Next.js app in `docs`

</p></details>

<details><summary>Code Layout: What are the folders for?
</summary>
<p>

The `splitgraph.com` repository is a TypeScript mono-repo with multiple
workspaces. Most importantly, the [`docs`](./docs) workspace is a Next.js app, and
the `tdesign` workspace contains the component library and theme.

To resolve imports of packages from within JS scripts or tooling, we use the
`yarn berry` workspace feature. When typechecking, we use TypeScript project
references with aliases to match the yarn reoslution, e.g. `@splitgraph/tdesign`.
Note that we're using a differently named lockfile, but otherwise it's a regular
yarn installation.

### Important workspaces

- [splitgraph.com](./docs)
  - The root workspace. You can run most commands from here, which it mostly
    forwards to the `docs` workspace anyway.
- [docs](./docs) (Import from `@splitgraph/docs`)
  - The Next.js app that is the primary entrypoint of the repository
  - Currently, storybook is part of the docs package
- [tdesign](./tdesign) (Import from `@splitgraph/tdesign`)
  - The design kit / component library / theme / etc. Very much a WIP.
  - It's called "`tdesign`" as in "typescript design`, because originally we had JS files in `design`, and we are still migrating that.

### Less important workspaces

- [design](./design) (Import from `@splitgraph/design`)
  - The deprecated design kit, which might still be used in a few places.
    You can mostly ignore this.
- [lib](./lib) (Import from `@splitgraph/lib`)
  - Utilities and library functions
- [content-scripts](./content-scripts) (not for importing)
  - Various scripts meant for CLI consumption, e.g. to update docs

## Where to create new pages and components

Create new pages in [`docs/pages`](./docs/pages). It's a standard Next.js app for
the most part (there are currently issues with `<Link>` due to some weird routing, but you
can ignore that for now.)

Do not save components in the `docs/pages` directory.

You can save components in `docs/components`, and then import them via the
prefix `@splitgraph/docs/components`.

If you think a component is reusable outside of the docs site, you can save
it in the design library at `@splitgraph/tdesign`.

When creating components, try to follow the existing style (we'll eventually
document this / add linter / scaffolding scripts).)

</p>
</details>

<details><summary>Theming
</summary><p>

## Whats the story with theming?

We recently migrated from `theme-ui` to `material-ui` v5 (alpha). You may find
it a bit rough around the edges at the moment. Note that MUI v5 depends on
Emotion v11.

New pages are not required to use a MUI theme or any MUI code. Instead, they
can simply import the emotion theme (`design.ts`) and use it with the default
`ThemeProvider` from emotion. You can see examples of this in
[docs/components/DemoComponents](./docs/components/DemoComponents).

### Theme Files

These are the three themes you could import:

- [design.ts](./tdesign/src/themes/design.ts)
  - The basic theme that you usually want to import. Works with Emotion. WIP.
  - Aug 2021: this has been merged with muiTheme.ts and may be considered 'soft deprecated'.
- [muiTheme.ts](./tdesign/src/themes/muiTheme.ts)
  - The theme you want to import if the page is using any MUI components.
- [legacyTheme.ts](./tdesign/src/themes/legacyTheme.ts)
  - A theme that we are slowly deprecating. Other components depend on it.

### Styling approaches

These examples are available in
[docs/components/DemoComponents](./docs/components/DemoComponents).

- `sx` + `className`:
  React's built-in `className` prop can be a useful (and styling library agnostic) way to target child components.
  You can define some styles in a parent and pass them into the children like so:

```jsx
const styles = {
  ".child": { color: "green" }
}

<Parent sx={styles}>
  <Child className="child">
    <p>Hello</p>
  </Child>
</Parent>
```

- `css` prop
  Emotion gives us a css prop that accepts vanilla CSS.

```jsx
<Slider
  defaultValue={30}
  css={css`
    color: #20b2aa;

    :hover {
      color: #2e8b57;
    }
  `}
/>
```

- Styled components
  Emotion takes inspiration from the styled components approach.
  Using styled components also lets you access props and the Emotion `Theme`, for components that are children of the <ThemeProvider>.

```jsx
const DemoStyled = styled.div`
  outline: 1px solid green;
  color: ${(props) => {
    return props.theme.myColor;
  }};
`;
```

</p></details>

<details><summary>Storybook
</summary><p>

## Storybook

Storybook is installed in the `@splitgraph/docs` workspace in the `docs` directory.
The commands below assume that `docs` is the current working directory. Regardless
of directory, you can always call the command by substituting `yarn`
with `yarn workspace @splitgraph/docs`, e.g. `yarn workspace @splitgraph/docs storybook-dev`

### Developing Storybook

Will default bind to port `0.0.0.0:3000` (suitable for running in Docker).

```bash
# Command:
yarn storybook-dev

# Implementation:
# "storybook-dev": "yarn run storybook --host 0.0.0.0 --port 3000 --no-open",
```

### Developing Storybook, but with more logs

Same as development, but adds flags `--loglevel silly --debug-webpack`

```bash
# Command
yarn storybook-diagnostic

# Implementation
# "storybook-diagnostic": "yarn run storybook-dev --loglevel silly --debug-webpack"
```

### Building Storybook

Output will default to `docs/out-storybook`

```bash
# Command:
yarn storybook-build

# Implementation:
# "storybook-build": "yarn run build-storybook -o out-storybook",
```

</p></details>

<details><summary>Debugging CI
</summary><p>

```bash

# To run it all the way through, just run this command:
.ci/debug/run_act.sh

# Note: No apparent way to run act as a daemon; it only runs in the foreground
# So, to drop into a debugger, open two terminals: one to run, and one to attach

# In (1), Run and "break" before pre-install. See `install.sh` (it's a sleep loop)
.ci/debug/run_act_break_before_install.sh

# In (2), Attach an interactive shell to the container in (1), with `docker exec`:
# (When (1) hits the breakpoint, it will print this command before sleeping)
docker exec -it $(docker ps -q --filter name=act-*) /bin/bash

# If you need to kill the container, ctrl+c isn't enough
docker kill $(docker ps -q --filter name=act-*)
```

</p></details>

<details><summary>Installing on a fresh system with `nvm` (rough notes)
</summary>
<p>

This was my experience cloning on a Mac recently. The instructions above contain
the important steps, but this section includes more details and troubleshooting
from a recent installation on a Mac. (e.g. note it doesn't include the tsconfig
details, but that's still necessary). This process will be smoothed out
eventually.

## Install nvm

Install nvm: https://github.com/nvm-sh/nvm#installing-and-updating

Make sure correct lines are in `~/.bash_profile`, and if you add them,
make sure to `source ~/.bash_profile` afterward.

(taken from the above link)

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## After cloning, create an environment

```bash
# example (note that v15 is not LTS)
 nvm install 15.12.0
```

## Install yarn

```bash
npm install -g yarn
```

## Try to setup

```bash
./setup.sh
```

Errors like this?

```bash
❯ yarn --version
node:internal/modules/cjs/loader:927
  throw err;
  ^

Error: Cannot find module '/private/tmp/splitgraph.com/.yarn/releases/yarn-berry.cjs'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:924:15)
    at Function.Module._load (node:internal/modules/cjs/loader:769:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

Clean up

```bash
find .yarn -type f -delete
rm .yarnrc
./setup.sh

```

Get error again?

Check `.yarnrc.yml` to make sure it's point to yarn release with the same file extension as the relase on your system. If not, edit the file `vi .yarnrc.yml` to change the extension.

```bash
cat .yarnrc.yml
```

Mismatch:

```bash

❯ cat .yarnrc.yml
yarnPath: ".yarn/releases/yarn-berry.cjs" # <--- should be .js

/tmp/splitgraph.com ⋄ canary-header*
❯ ls .yarn/releases/
yarn-berry.js   # <--- the file is .js

```

</p>
</details>
