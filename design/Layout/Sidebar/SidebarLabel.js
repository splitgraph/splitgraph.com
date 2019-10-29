// @jsx jsx
import { jsx } from "theme-ui";
import { useRef, useEffect } from "react";

import { styleBreaker } from "./SidebarStyle";
import { useLayoutEffect } from "react";

const ClassNames = {
  Base: "sgr-sidebar-label",
  ActiveNode: "sgr-sidebar-label--active",
  InActivePath: "sgr-sidebar-label--activePath",
  ActiveNodeAndNothingClicked: "sgr-sidebar-label--active--nothing-clicked",
  InActivePathAndNothingClicked:
    "sgr-sidebar-label--activePath--nothing-clicked",
  LastClicked: "sgr-sidebar-label--lastClicked",
  InLastClickedPath: "sgr-sidebar-label--lastClickedPath",

  // A "root" node according to minLabelDepth
  RootNode: "sgr-sidebar-label--root",

  // A node that has at least one child
  ParentNode: "sgr-sidebar-label--parent",

  // A parent node in the active path
  ActiveParentNode: "sgr-sidebar-label--parent--active",

  // A parent node in the active path when nothing has been clicked
  ActiveParentNodeAndNothingClicked:
    "sgr-sidebar-label--parent--active--nothing-clicked",

  // A parent node in the active path
  ClickedParentNode: "sgr-sidebar-label--parent--clicked",

  // A node that has a parent
  ChildNode: "sgr-sidebar-label--child",

  // (lol) A node with a parent that is in the active path
  ChildOfActiveParent: "sgr-sidebar-label--child--of-active-parent",

  // A node with a parent that is in the active clicked path
  ChildOfClickedParent: "sgr-sidebar-label--child-of-clicked-parent",

  // A node that is neither in the active path nor the clicked path
  MutedNode: "sgr-sidebar-label--muted"
};

const Selectors = Object.keys(ClassNames).reduce(
  (acc, classNameKey) => ({
    ...acc,
    [classNameKey]: `.${ClassNames[classNameKey]}`
  }),
  {}
);

const hideSidebars = {
  "ul::-webkit-scrollbar": {
    width: 0,
    height: 0
  },
  "ul::-webkit-scrollbar-button": {
    width: 0,
    height: 0
  }
};

const styles = {
  Base: {
    scrollSnapAlign: "center",
    ...hideSidebars,
    BaseLabel: {},
    RootLabel: {},
    ChildLabel: {}
  },
  Horizontal: {
    [`${Selectors.ActiveParentNodeAndNothingClicked}:after,
      ${Selectors.ClickedParentNode}:after`]: {
      content: '"\\25BC"',
      fontSize: ".7em",
      paddingLeft: 2
    },

    [`a${Selectors.ChildNode}`]: {
      boxShadow: "0 0 4px rgba(0, 0, 0, .125)"
    },

    [`${Selectors.Base}`]: {
      lineHeight: "4rem",
      paddingBottom: ".5rem",
      paddingTop: ".5rem",
      borderRadius: "4px",
      // lineHeight: "2rem"
      // padding: "2rem"
      marginRight: "0.5rem",
      cursor: "pointer",
      // ":hover": {
      //   textDecoration: "underline"
      // },
      paddingLeft: 3,
      paddingRight: 3,
      borderBottom: "1px",
      // borderBottomStyle: "solid",
      borderBottomColor: "primary",
      color: "primary",

      scrollSnapAlign: "center"
      // marginLeft: 2
    },

    [`${Selectors.LastClicked}`]: {
      // color: "red"
      textDecoration: "underline"
    },
    [`${Selectors.ActiveNode}, ${Selectors.InActivePath}`]: {
      // color: "purple",
      borderLeftWidth: "2px",
      borderLeftStyle: "solid",
      borderLeftColor: "primary"
    },
    [`${Selectors.MutedNode}`]: {
      opacity: 0.5,
      backgroundColor: "#cccccc"
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
  isInLastClickedPath,
  anythingBeenClicked,
  isParent,
  isChild,
  isChildOfActiveParent,
  isChildOfClickedParent
}) => {
  const classNames = [ClassNames.Base];

  if (isActiveNode) {
    classNames.push(ClassNames.ActiveNode);

    if (!anythingBeenClicked) {
      classNames.push(ClassNames.ActiveNodeAndNothingClicked);
    }
  } else if (isInActivePath) {
    classNames.push(ClassNames.InActivePath);

    if (!anythingBeenClicked) {
      classNames.push(ClassNames.InActivePathAndNothingClicked);
    }
  }

  if (isLastClicked) {
    classNames.push(ClassNames.LastClicked);
  } else if (isInLastClickedPath) {
    classNames.push(ClassNames.InLastClickedPath);
  }

  const notActive = !isActiveNode && !isInActivePath;
  const unclicked = !isLastClicked && !isInLastClickedPath;
  if (notActive && (unclicked && !isChildOfClickedParent)) {
    classNames.push(ClassNames.MutedNode);
  }

  if (isLabelRoot) {
    classNames.push(ClassNames.RootNode);
  } else {
    classNames.push(ClassNames.ChildNode);
  }

  if (isParent) {
    classNames.push(ClassNames.ParentNode);

    if (isInActivePath) {
      classNames.push(ClassNames.ActiveParentNode);
      if (!anythingBeenClicked) {
        classNames.push(ClassNames.ActiveParentNodeAndNothingClicked);
      }
    }

    if (isInLastClickedPath) {
      classNames.push(ClassNames.ClickedParentNode);
    }
  }

  if (isChild) {
    classNames.push(ClassNames.ChildNode);

    if (isChildOfActiveParent) {
      classNames.push(ClassNames.ChildOfActiveParent);
    }

    if (isChildOfClickedParent) {
      classNames.push(ClassNames.ChildOfClickedParent);
    }
  }

  return classNames.join(" ");
};

const hideScrollbars = el => {
  el.style["::-webkit-scrollbar"] =
    "width: 0 !important; background: transparent;";
  // el.style["overflow"] = "-moz-scrollbars-none";
  el.style["-ms-overflow-style"] = "none";
};

const revealScrollbars = el => {
  el.style["-webkit-scrollbar"] = "initial";
  // el.style["overflow"] = "initial";
  el.style["-ms-overflow-style"] = "initial";
};

const useScrollToActiveNode = ({
  nodeId,
  isInActivePath,
  isInLastClickedPath,
  containerEl,
  anythingBeenClicked
}) => {
  useLayoutEffect(() => {
    const scrollTarget = containerEl.current;
    const isActiveAndLastClicked = isInActivePath && isInLastClickedPath;
    if (
      !isInActivePath ||
      !scrollTarget ||
      (anythingBeenClicked && !isActiveAndLastClicked)
    ) {
      return;
    }

    // Hide the scrollbars, temporarily, to avoid a flash of them when
    // the page loads
    const scrollContainer = containerEl.current.closest("ul");
    hideScrollbars(scrollContainer);
    scrollTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
    revealScrollbars(scrollContainer);
  }, [nodeId, isInActivePath, containerEl]);
};

const SidebarLabel = ({
  node,
  minLabelDepth,
  onClick,
  Link,
  isActiveNode,
  isChildOfActiveParent,
  isChildOfClickedParent,
  isLastClicked,
  isInActivePath,
  isInLastClickedPath,
  anythingBeenClicked
}) => {
  const {
    depth,
    nodeId,
    url,
    slug,
    metadata: { title } = {},
    children,
    parentNodeId
  } = node;
  const isParent = children && children.length > 0;
  const isChild = !!parentNodeId;

  const labelClassNames = getClassNames({
    isLabelRoot: minLabelDepth === depth,
    isActiveNode,
    isLastClicked,
    isInActivePath,
    isInLastClickedPath,
    anythingBeenClicked,
    isParent,
    isChild,
    isChildOfActiveParent,
    isChildOfClickedParent
  });

  const labelContainerId = `sgr-sidebar-label-container-${nodeId}`;

  const containerEl = useRef(null);

  useScrollToActiveNode({
    nodeId,
    isInActivePath,
    isInLastClickedPath,
    containerEl,
    anythingBeenClicked
    // scrollTarget: containerEl ? containerEl.current : null
  });

  return node && url ? (
    <span sx={Style} onClick={onClick} id={labelContainerId} ref={containerEl}>
      <Link href={url}>
        <a
          className={labelClassNames}
          title={title}
          sx={{ textDecoration: "none" }}
        >
          {title}
        </a>
      </Link>
    </span>
  ) : depth >= minLabelDepth ? (
    <span sx={Style} id={labelContainerId} ref={containerEl}>
      <span title={title} onClick={onClick} className={labelClassNames}>
        {title}
      </span>
    </span>
  ) : null;
};

export default SidebarLabel;
