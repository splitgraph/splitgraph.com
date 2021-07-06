# splitgraph.com website

## reset, install, and run dev -- one liner:

```bash
{ sudo ./clean.sh ; } ; ./setup.sh && yarn install && yarn dev
```

## scripts for running on host machine:

- `./clean.sh`:

  - Run this script to "reset" everything, especially if you've been running
    in docker and are having issues with overlapping permissions, or missing
    manifest files
  - Note: If you are fixing permission errors, you likely want to run this with `sudo`

- `./setup.sh`:

  - Run this script to setup `yarn` itself, especially if you are having trouble
    with running `yarn` (error, "missing yarn berry" or anything like this)

- `yarn dev`
  - Run this script to start dev of the docs, after running `yarn install`

## debugging CI

```bash

# Start `act`
.ci/debug/run_act.sh

# "Break" before running bulk of install step (see `install.sh`)
.ci/debug/run_act_break_before_install.sh

# The "break" is just an infinite loop of `sleep 10`
# To get an interactive shell, need to `docker exec` into that container

docker exec -it $(docker ps -q --filter name=act-*) /bin/bash

# If you need to kill the container
docker kill $(docker ps -q --filter name=act-*)

## HOWTO get started with splitgraph.com

[splitgraph.com](https://github.com/splitgraph/splitgraph.com) is a standalone, open source repo hosted on Github. One of it's purposes is to fulfill certain needs of other Splitgraph FE apps.

### What are the folders inside splitgraph.com for? (e.g. `design/`,`tdesign/`, etc)

Inside splitgraph.com are several folders (+ Nodejs sub-projects) that address different FE needs.

Generally `index.ts` (or `index.js`) exports are used to make things available for consumers (and in some cases make it possible to swap out implementations later)

- [design](./design) was the original place for components that get used in multiple places to live (i.e. a component library).
- [tdesign](./tdesign) was added later as we migrated pieces to TypeScript, one by one.
- [docs](./docs) is a Next.js app that powers splitgraph.com/docs
- [lib](./lib) utilities and library functions
- [content-scripts](./content-scripts) scripts for helping generate various pieces of the static site

As of July 2021 the majority of components have been TypeScript-ified and migrated from design to tdesign.

#### "Where should I save new React components?"

The catalog is its own Next.js app, and it depends on splitgraph.com for certain components.
The docs app lives inside splitgraph.com, and is a separate Next.js app that can be considered 'static' and 'public.'
Dependencies of e.g. catalog on splitgraph.com are allowed, but _NOT_ the other way around/
Never, ever, write code inside splitgraph.com that depends on catalog.

When writing a new React component, consider "does this component need to be used by both Catalog and/or Docs?" or
"is it likely to be useful in more than one place". If the answer is yes, consider saving it inside the splitgraph.com component library.

### Whats the story with theming?

splitgraph.com and the catalog were recently migrated from Theme-UI to MUI (v5).

- [design.ts](./tdesign/src/themes/design.ts) is intended to be a place for designer-originated colors.
- [muiTheme.ts](./tdesign/src/themes/muiTheme.ts) is where the MUI theme and various overrides live.
- [legacyTheme.ts](./tdesign/src/themes/legacyTheme.ts) is where the remants of the old theming approach live.

### Styling approaches

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

### Brief background

Historically catalog (and docs) used Theme-UI, then later catalog and docs was migrated to MUI. MUIv5 (currently in late alpha) switches the styling from "JSS" to Emotion.
The MUI docs have a page on [interop](https://next.material-ui.com/guides/interoperability/) with variety of styling approaches.
The preference is to remain flexible/agnostic where possible, and be able to use whatever theme approach makes the most sense. Sometimes MUI components are an excellent fit, but we don't want to become overly dependent on one solution. That is one reason why both Emotion's <ThemeProvider /> and MUI's <ThemeProvider /> are worth considering.

### How should I know which <ThemeProvider /> to use

Next.js's router uses the filesystem to configure routing. [docs](https://nextjs.org/docs/routing/introduction)

Different pages across the app have different Providers/Contexts; it's suggested to consider the Providers your page has before diving in and passing data around.

Let's discuss an example of figuring out which ThemeProvider you may need based on a route.
For purposes of an example let's say you're trying to add a `<Button />` to the /explore page.

Suggested steps:

- Pull up the page in the browser and note the path e.g. for https://splitgraph.test/explore -> 'explore' is the path
- There will be a relevant file under /pages, e.g. /pages/explore. (If you don't see it, be aware some pages use dynamic routing e.g. `[page]`)
- Using the React DevTools, follow your way up the parent node of the page, until you see a ThemeProvider. It will be either MUI, Theme-UI, or something else.

### Installing on Ubuntu (on Windows)

One way to install Node.js v15 (should work on Ubuntu + maybe Debian also):

From a bash prompt:
`su -c 'curl -sL https://deb.nodesource.com/setup_15.x | bash -'`

## You may also need development tools to build native addons:

     sudo apt-get install gcc g++ make

## To install the Yarn package manager, run:

     curl -sL $yarn_key_url | gpg --dearmor | sudo tee $local_yarn_key >/dev/null
     echo \"deb [signed-by=$local_yarn_key] $yarn_site stable main\" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn

## Almost done! To get splitgraph.com running:

```shell
# clone splitgraph.com
$ git clone https://github.com/splitgraph/splitgraph.com.git
$ cd splitgraph.com
# yarn v2 is required. it's set on a per-project basis
$ yarn set version berry
# pull in the deps
$ yarn install
#
```
