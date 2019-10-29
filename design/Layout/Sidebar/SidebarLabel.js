// @jsx jsx
import { jsx } from "theme-ui";

import { styleBreaker } from "./SidebarStyle";

const ClassNames = {
  Base: "sgr-sidebar-label",
  ActiveNode: "sgr-sidebar-label--active",
  InActivePath: "sgr-sidebar-label--activePath",
  LastClicked: "sgr-sidebar-label--lastClicked",
  InLastClickedPath: "sgr-sidebar-label--lastClickedPath",
  RootNode: "sgr-sidebar-label--root",
  ChildNode: "sgr-sidebar-label--child",
  MutedNode: "sgr-sidebar-label--muted"
};

const Selectors = Object.keys(ClassNames).reduce(
  (acc, classNameKey) => ({
    ...acc,
    [classNameKey]: `.${ClassNames[classNameKey]}`
  }),
  {}
);

const styles = {
  Base: {
    BaseLabel: {},
    RootLabel: {},
    ChildLabel: {}
  },
  Horizontal: {
    [`${Selectors.Base}`]: {
      lineHeight: "2rem",
      // lineHeight: "2rem"
      // padding: "2rem"
      marginRight: "0.5rem",
      cursor: "pointer",
      ":hover": {
        textDecoration: "underline"
      },
      paddingLeft: 2,
      paddingRight: 2,
      borderBottom: "1px",
      // borderBottomStyle: "solid",
      borderBottomColor: "primary",
      color: "primary",
      marginLeft: 2,
      boxShadow: "0 0 4px rgba(0, 0, 0, .125)"
    },

    [`${Selectors.LastClicked},${Selectors.InLastClickedPath}`]: {
      // color: "red"
    },
    [`${Selectors.ActiveNode}, ${Selectors.InActivePath}`]: {
      // color: "purple",
      borderLeftWidth: "2px",
      borderLeftStyle: "solid",
      borderLeftColor: "primary"
    },
    [`${Selectors.MutedNode}`]: {
      opacity: 0.5
    },
    [`${Selectors.ActiveNode},${Selectors.InActivePath}`]: {
      fontWeight: "bold"
    }
  },
  Vertical: {}
};

const Style = {
  ...styles.Base,
  "@media (min-width: 769px)": {
    ...styles.Vertical
  },
  "@media (max-width: 768px)": {
    ...styles.Horizontal
  }
};

const getClassNames = ({
  isLabelRoot,
  isActiveNode,
  isLastClicked,
  isInActivePath,
  isInLastClickedPath
}) => {
  const classNames = [ClassNames.Base];

  if (isActiveNode) {
    classNames.push(ClassNames.ActiveNode);
  } else if (isInActivePath) {
    classNames.push(ClassNames.InActivePath);
  }

  if (isLastClicked) {
    classNames.push(ClassNames.LastClicked);
  } else if (isInLastClickedPath) {
    classNames.push(ClassNames.InLastClickedPath);
  }

  const notActive = !isActiveNode && !isInActivePath;
  const unclicked = !isLastClicked && !isInLastClickedPath;
  if (notActive && unclicked) {
    classNames.push(ClassNames.MutedNode);
  }

  if (isLabelRoot) {
    classNames.push(ClassNames.RootNode);
  } else {
    classNames.push(ClassNames.ChildNode);
  }

  return classNames.join(" ");
};

const SidebarLabel = ({
  node,
  minLabelDepth,
  onClick,
  Link,
  isActiveNode,
  isLastClicked,
  isInActivePath,
  isInLastClickedPath
}) => {
  const { depth, nodeId, url, slug, metadata: { title } = {}, children } = node;

  const labelClassNames = getClassNames({
    isLabelRoot: minLabelDepth === depth,
    isActiveNode,
    isLastClicked,
    isInActivePath,
    isInLastClickedPath
  });

  return node && url ? (
    <span sx={Style} onClick={onClick}>
      <Link href={url}>
        <a className={labelClassNames} title={title}>
          {title}
        </a>
      </Link>
    </span>
  ) : depth >= minLabelDepth ? (
    <span sx={Style}>
      <span title={title} onClick={onClick} className={labelClassNames}>
        {title}
      </span>
    </span>
  ) : null;
};

export default SidebarLabel;
