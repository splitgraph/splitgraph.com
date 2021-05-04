import { useRef } from "react";
import { Box } from "@material-ui/core";

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
  MutedNode: "sgr-sidebar-label--muted",

  // This is dynamic, and we use it for padding, but realistically there is a
  // max, so we can still use the selector system to assign
  Depth: (depth, minLabelDepth = 0) =>
    `sgr-sidebar-depth-${depth - minLabelDepth}`,
};

const Selectors = Object.keys(ClassNames).reduce(
  (acc, classNameKey) => ({
    ...acc,
    [classNameKey]: `.${
      typeof ClassNames[classNameKey] === "string"
        ? ClassNames[classNameKey]
        : "doesnotexist"
    }`,
  }),
  {}
);

// We can tweak this if we need more depth. Tradeoff is extra code in bundle.
const getHardcodedDepthStyles = (maxHardCodedDepth = 10) => {
  const depthStyles = {
    Base: {},
    Vertical: {},
    Horizontal: {},
  };

  // Don't count the root nodes, we want to set their style separately
  for (let depth = 1; depth < maxHardCodedDepth; depth++) {
    let paddingLeft = depth / 2;
    let marginLeft = depth > 1 ? depth / 2 : 0;

    depthStyles.Vertical[`.${ClassNames.Depth(depth)}`] = {
      paddingLeft: `${paddingLeft}rem`,
      marginLeft: `${marginLeft}rem`,
      paddingRight: depth >= 1 ? "1rem" : `${depth}rem`,

      paddingLeft:
        depth >= 1 ? `${marginLeft + paddingLeft}rem !important` : "initial",
      marginRight: depth >= 1 ? `${marginLeft}rem` : "initial",
    };

    depthStyles.Vertical[
      `.${ClassNames.Depth(depth)}${
        Selectors.InActivePath
      }, .${ClassNames.Depth(depth)}${Selectors.InLastClickedPath}`
    ] = {
      borderBottomStyle: "solid",
      borderBottomWidth: "2px",
      borderBottomColor: "lightgray",
    };

    depthStyles.Vertical[
      `.${ClassNames.Depth(depth)}${Selectors.ActiveNode}, .${ClassNames.Depth(
        depth
      )}${Selectors.LastClicked}`
    ] = {
      borderBottomStyle: "solid",
      borderBottomWidth: "2px",
      borderBottomColor: "lightgray",
      borderLeftColor: "primary.main",
      borderRightStyle: "solid",
    };
  }

  return depthStyles;
};

const hideSidebars = {
  "ul::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
  "ul::-webkit-scrollbar-button": {
    width: 0,
    height: 0,
  },
};

const styles = {
  Base: {
    scrollSnapAlign: "center",
    ...hideSidebars,
    BaseLabel: {},
    RootLabel: {},
    ChildLabel: {},
  },
  Horizontal: {
    [`${Selectors.ActiveParentNodeAndNothingClicked}:after,
      ${Selectors.ClickedParentNode}:after`]: {
      content: '"\\25BC"',
      fontSize: ".7em",
      paddingLeft: 2,
    },

    [`a${Selectors.ChildNode}`]: {
      boxShadow: "0 0 4px rgba(0, 0, 0, .125)",
    },

    [`${Selectors.Base}`]: {
      lineHeight: "4rem",
      paddingBottom: ".5rem",
      paddingTop: ".5rem",
      borderRadius: "4px",
      marginRight: "0.5rem",
      cursor: "pointer",
      paddingLeft: 3,
      paddingRight: 3,
      borderBottom: "1px",
      borderBottomColor: "primary.main",
      color: "primary.main",
      scrollSnapAlign: "center",
    },

    [`${Selectors.LastClicked}`]: {
      textDecoration: "underline",
    },

    [`${Selectors.ActiveNode}, ${Selectors.InActivePath}`]: {
      // color: "purple",
      borderLeftWidth: "2px",
      borderLeftStyle: "solid",
      borderLeftColor: "primary.main",
    },

    [`${Selectors.MutedNode}`]: {
      opacity: 0.5,
      backgroundColor: "gray",
    },

    [`${Selectors.ActiveNode},${Selectors.InActivePath}`]: {
      fontWeight: "bold",
    },
  },
  Vertical: {
    [`${Selectors.Base}`]: {
      color: "primary.main",
      display: "flex",
      alignItems: "center",
      height: "2rem",
      cursor: "pointer",
      borderRightWidth: "0px",
      borderRightColor: "lightgray",
      borderRightStyle: "solid",
      backgroundColor: "#efefef",
    },

    [`${Selectors.MutedNode}`]: {
      // opacity: 0.5
      // backgroundColor: "#efefef"
    },

    /* Note the order of these selectors is very important!

    A Node can simultaneously be:

      - root + parent
      - parent + child

    And can NOT be

      - root + child
      - child + root

    The last selectors will take precedence when an object is both.
    */

    // 1. Child node, may also be parent node. Definitely not root node.
    [`${Selectors.ChildNode}`]: {
      // paddingTop: 1,
      // paddingBottom: 1,
      paddingTop: 0,
      paddingBottom: 0,
      borderLeftWidth: "4px",
      borderLeftStyle: "solid",
      ":hover": {
        borderColor: "white",
        // backgroundColor: "white"
        textDecoration: "underline",
      },
    },

    [`${Selectors.ChildOfActiveParent}`]: {
      borderLeftWidth: "4px",
      ":hover": {
        borderLeftColor: "primary.main",
      },
    },

    [`${Selectors.ActiveParentNode} ul`]: {
      backgroundColor: "primary.main !important",
    },

    // 2. Parent Node, may also be child node or root node.
    [`${Selectors.ParentNode}`]: {
      // backgroundColor: "initial",
      borderLeftWidth: "4px",
      borderLeftStyle: "solid",
      borderLeftColor: "primary.main",
      alignItems: "center",
      fontWeight: "bold",
      fontVariant: "small-caps",
      fontSize: "0.8em",
      textTransform: "uppercase",
    },

    [`${Selectors.InActivePath}`]: {
      backgroundColor: "#fff",
      // Root doesn't have its box shadow dynamically set
      boxShadow: `0 0.2rem 4px rgba(0, 0, 0, .25)`,
      ":hover": {
        borderLeftColor: "primary.main",
        borderLeftStyle: "solid",
        borderLeftWidth: "4px",
      },
    },

    // 3. Root node, may also be parent node. Definitely not child node.
    [`${Selectors.RootNode}`]: {
      // paddingTop: "1rem",
      paddingTop: 0,
      paddingLeft: "8px",
      justifyContent: "flex-end",
      paddingRight: "8px",
      borderLeftStyle: "none",
      backgroundColor: "#efefef",
      borderTopStyle: "none",
      borderTopColor: "primary.main",
      borderTopWidth: "4px",
      ":hover": {
        borderLeftWidth: "0px",
        borderLeftStyle: "none",
      },
    },

    [`${Selectors.RootNode}${Selectors.InActivePath}`]: {
      backgroundColor: "#fff",
    },

    [`${Selectors.ParentNode}${Selectors.InActivePath}, ${Selectors.ParentNode}${Selectors.InLastClickedPath}`]: {
      backgroundColor: "#fff",
    },

    [`${Selectors.ParentNode}${Selectors.LastClicked}`]: {
      backgroundColor: "#fff",
    },

    [`${Selectors.ActiveNode}`]: {
      backgroundColor: "#fff",
      borderRightStyle: "none",
      borderLeftStyle: "solid",
      borderLeftColor: "primary.main",
      borderLeftWidth: "4px",
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderTopColor: "lightgray",
      borderBottomColor: "lightgray",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      ":hover": {
        // unfortunately need to set again or will use other :hover
        borderLeftColor: "primary.main",
        borderLeftStyle: "solid",
        borderLeftWidth: "4px",
        borderLeftWidth: "4px",
        borderTopStyle: "solid",
        borderBottomStyle: "solid",
        borderTopColor: "lightgray",
        borderBottomColor: "lightgray",
        borderTopWidth: "1px",
        borderBottomWidth: "1px",
      },
    },
  },
};

const Style = {
  ...styles.Base,
  ...getHardcodedDepthStyles().Base,
  "@media (min-width: 769px)": {
    ...styles.Vertical,
    ...getHardcodedDepthStyles().Vertical,
  },
  "@media (max-width: 768px)": {
    ...styles.Horizontal,
    ...getHardcodedDepthStyles().Horizontal,
  },
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
  isChildOfClickedParent,
  depth,
  minLabelDepth,
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
  if (notActive && unclicked && !isChildOfClickedParent) {
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

  classNames.push(ClassNames.Depth(depth, minLabelDepth));

  return classNames.join(" ");
};

const hideScrollbars = (el) => {
  el.style["::-webkit-scrollbar"] =
    "width: 0 !important; background: transparent;";
  el.style["overflow"] = "-moz-scrollbars-none";
  el.style["-ms-overflow-style"] = "none";
};

const revealScrollbars = (el) => {
  el.style["-webkit-scrollbar"] = "initial";
  // el.style["overflow"] = "initial";
  el.style["-ms-overflow-style"] = "initial";
};

const useScrollToActiveNode = ({
  nodeId,
  isInActivePath,
  isInLastClickedPath,
  containerEl,
  anythingBeenClicked,
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

const useScrollToActiveNodeOnClient =
  typeof window === "undefined" ? () => {} : useScrollToActiveNode;

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
  anythingBeenClicked,
}) => {
  const {
    depth,
    nodeId,
    url,
    slug,
    metadata: { title, sidebarTitle = null } = {},
    children,
    parentNodeId,
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
    isChildOfClickedParent,
    depth,
    minLabelDepth,
  });

  const labelContainerId = `sgr-sidebar-label-container-${nodeId}`;

  const containerEl = useRef(null);

  useScrollToActiveNodeOnClient({
    nodeId,
    isInActivePath,
    isInLastClickedPath,
    containerEl,
    anythingBeenClicked,
  });

  const _title = sidebarTitle || title;

  return node && url ? (
    <Box
      component="span"
      sx={Style}
      onClick={onClick}
      id={labelContainerId}
      ref={containerEl}
    >
      <Link
        href={url}
        className={labelClassNames}
        title={_title}
        sx={{ textDecoration: "none" }}
      >
        {_title}
      </Link>
    </Box>
  ) : depth >= minLabelDepth ? (
    <Box component="span" sx={Style} id={labelContainerId} ref={containerEl}>
      <Box
        component="span"
        title={_title}
        onClick={onClick}
        // onMouseOver={onClick}
        className={labelClassNames}
      >
        {_title}
      </Box>
    </Box>
  ) : null;
};

export default SidebarLabel;
