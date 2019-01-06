"""
Generates the sgr documentation in Markdown format
"""

import os
import shutil

import click
import splitgraph.commandline as cmd

# Map category to Click commands -- maybe eventually we'll read this dynamically...
STRUCTURE = {'Image management/creation': ['checkout', 'commit', 'tag', 'import'],
             'Image information': ['log', 'diff', 'show', 'sql', 'status'],
             'Miscellaneous': ['mount', 'rm', 'init', 'cleanup', 'prune', 'config'],
             'Sharing images': ['clone', 'push', 'pull', 'publish', 'upstream'],
             'Splitfile execution': ['build', 'rebuild', 'provenance']
             }


def _emit_document_header(doc_id, title):
    return "---\nid: %s\ntitle: %s\n---\n\n" % (doc_id, title)


def _emit_header(header, level=1):
    return "#" * level + " " + header


def _emit_command(command_name):
    command = getattr(cmd, command_name + '_c')
    result = _emit_header(command_name, level=2) + "\n" + command.help
    return result


def _slug_section(section):
    return section.lower().replace(' ', '_').replace('/', '_')


@click.command(name='main')
@click.argument('output', default='../docs/sgr', required=False)
@click.option('-f', '--force', default=False, is_flag=True)
def main(output, force):
    if os.path.exists(output):
        if not force:
            raise click.ClickException('%s already exists, pass -f' % output)
        else:
            print("Removing %s" % output)
            shutil.rmtree(output)

    os.mkdir(output)

    for section, commands in STRUCTURE.items():
        section_slug = _slug_section(section)
        section_path = os.path.join(output, section_slug + '.md')

        with open(section_path, 'w') as f:
            f.write(_emit_document_header(section_slug, section))

            for c in commands:
                print("Making %s: %s..." % (section_path, c))
                f.write(_emit_command(c) + "\n\n")

    print("Done.")
    sidebar_spec = "\"sgr command line client\": [" + ",\n".join('"sgr/' + _slug_section(s) + '"' for s in STRUCTURE) + ']'
    print(sidebar_spec)


if __name__ == "__main__":
    main()
