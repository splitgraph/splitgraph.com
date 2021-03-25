/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";

import { useMemo } from "react";

import { Box } from "@splitgraph/design";

import useSidebar from "./useSidebar";

import SidebarStyle from "./SidebarStyle";
import useSidebarNode from "./useSidebarNode";

import SidebarLabel from "./SidebarLabel";

const getInlineFooterStyle = ({ depth, show, initialDepth, loading }) => ({
  "@media (max-width: 768px)": {
    display: show ? "flex" : "none",
    alignItems: "flex-end",
    justifyContent: "center",
    boxShadow: "0 0 4px rgba(0, 0, 0, .125)",
    h1: {
      position: "absolute",

      // TODO
      //  not entirely sure why this works atm. need to review it.
      // 3 = header; 2 = 1 for 0 based, 1 because its the parent's depth;  4 = item; 6; some margin somewhere
      top: `calc(${depth * 4 + 3 - 4}rem - 6px)`,

      // When the page started at a deep depth but we navigated to a shallower
      // depth, we need to add padding to make the footer appear continuous
      ...(depth < initialDepth
        ? { paddingTop: `calc(${(initialDepth - depth) * 4}rem)` }
        : {}),

      left: 0,
      right: 0,
      height: "6rem",
      backgroundColor: loading ? "background" : "primary",
      color: "white",
      borderBottomLeftRadius: "40px",
      borderBottomRightRadius: "40px",
      align: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      display: "flex",
    },
  },
  "@media (min-width: 769px)": {
    display: "none",
  },
});

const DopeWaterLoadingAnimation = ({ loading }) => {
  const style = {
    width: "100%",
    height: "100%",
    backgroundColor: "background",
    borderBottomLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    overflow: "hidden",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: 9,
    marginTop: "2px",
    ":before": {
      content: '""',
      position: "absolute",
      top: "100%",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "primary",
      WebkitAnimation: "animtop 5s forwards, animtop2 2s forwards",
      animation: "animtop 5s forwards, animtop2 2s forwards",
      borderBottomLeftRadius: "40px",
      borderBottomRightRadius: "40px",
    },
    "@-webkit-keyframes animtop": {
      "0%": {
        top: "100%",
      },
      "75%": {
        top: 0,
      },
    },
    "@keyframes animtop": {
      "0%": { top: "100%" },
      "100%": { top: "25%" },
    },
    "@-webkit-keyframes animtop2": {
      "75%": { top: "25%" },
      "100%": { top: 0 },
    },
    "@keyframes animtop2": {
      "75%": { top: "25%" },
      "100%": { top: 0 },
    },
  };

  const containerStyle = useMemo(
    () => ({ display: loading ? "initial" : "none" }),
    [loading]
  );

  return (
    <Box sx={containerStyle}>
      <Box sx={style}>&nbsp;</Box>
    </Box>
  );
};

const ResetButton = ({ reset, show }) => {
  return (
    <span
      sx={{
        textTransform: "uppercase",
        fontSize: "1rem",
        ":hover": {
          cursor: "pointer",
        },
        display: show ? "initial" : "none",
      }}
      onClick={reset}
    >
      Collapse
    </span>
  );
};

const SidebarInlineFooter = ({
  nextDepth,
  lastClickedDepth,
  initialDepth,
  loading,
  reset,
}) => {
  const visibleDepth = nextDepth || lastClickedDepth || initialDepth;
  const show = loading || visibleDepth > initialDepth;

  const style = getInlineFooterStyle({
    depth: visibleDepth,
    show,
    initialDepth,
    loading,
  });

  return (
    <Box sx={style}>
      <h1>
        <div>
          <ResetButton reset={reset} show={!loading} />
          <DopeWaterLoadingAnimation loading={loading} />
        </div>
      </h1>
    </Box>
  );
};

const SidebarNode = ({
  Link,
  minLabelDepth,
  maxInitialStackDepth,
  node,
  activeNodeId,
  lastClickedNodeId,
  lastClickedPath,
  activeNodePath,
  onClickNode,
  acquireMutex,
  mutex,
}) => {
  const {
    depth,
    nodeId,
    parentNodeId,
    slug,
    metadata: { title } = {},
    children,
  } = node;

  const isParent = !!children && children.length > 0;

  const isNavigable = !!node && !!node.url && node.nodeId !== activeNodeId;

  const {
    onClick,
    childListContainerStyle,
    childListStyle,
    isActiveNode,
    isLastClicked,
    isInActivePath,
    isInLastClickedPath,
    anythingBeenClicked,
    isChildOfClickedParent,
    isChildOfActiveParent,
  } = useSidebarNode({
    nodeId,
    onClickNode,
    acquireMutex,
    mutex,
    activeNodePath,
    lastClickedPath,
    activeNodeId,
    parentNodeId,
    maxInitialStackDepth,
    minLabelDepth,
    depth,
    isParent,
    isNavigable,
  });

  const item = (
    <>
      <SidebarLabel
        node={node}
        minLabelDepth={minLabelDepth}
        onClick={onClick}
        isActiveNode={isActiveNode}
        isChildOfActiveParent={isChildOfActiveParent}
        isChildOfClickedParent={isChildOfClickedParent}
        isLastClicked={isLastClicked}
        isInActivePath={isInActivePath}
        isInLastClickedPath={isInLastClickedPath}
        Link={Link}
        anythingBeenClicked={anythingBeenClicked}
      />
      {children && (
        <div className="ul-wrapper" sx={childListContainerStyle}>
          <ul key={`${slug}`} sx={childListStyle}>
            {children.map((child) => (
              <SidebarNode
                key={`${child.slug}`}
                Link={Link}
                node={child}
                minLabelDepth={minLabelDepth}
                maxInitialStackDepth={maxInitialStackDepth}
                activeNodeId={activeNodeId}
                lastClickedNodeId={lastClickedNodeId}
                lastClickedPath={lastClickedPath}
                activeNodePath={activeNodePath}
                onClickNode={onClickNode}
                acquireMutex={acquireMutex}
                mutex={mutex}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return depth < minLabelDepth ? item : <li className="li-selector">{item}</li>;
};

const Sidebar = ({
  loading,
  rootNode,
  Link,
  minLabelDepth = 0,
  maxInitialStackDepth = 0,
  activeNodeId,
  lastClickedNodeId,
  lastClickedPath,
  activeNodePath,
  onClickNode,
  acquireMutex,
  mutex,
  lastClickedDepth,
  nextDepth,
  initialDepth,
  reset,
}) => {
  return (
    <>
      {!minLabelDepth &&
        rootNode &&
        rootNode.metadata &&
        rootNode.metadata.title && <h1>{rootNode.metadata.title}</h1>}
      <ul>
        <SidebarNode
          Link={Link}
          node={rootNode}
          minLabelDepth={minLabelDepth}
          activeNodeId={activeNodeId}
          lastClickedNodeId={lastClickedNodeId}
          lastClickedPath={lastClickedPath}
          activeNodePath={activeNodePath}
          onClickNode={onClickNode}
          acquireMutex={acquireMutex}
          mutex={mutex}
          maxInitialStackDepth={maxInitialStackDepth}
          lastClickedDepth={lastClickedDepth}
        />
      </ul>

      <SidebarInlineFooter
        nextDepth={nextDepth}
        lastClickedDepth={lastClickedDepth}
        initialDepth={initialDepth}
        loading={loading}
        reset={reset}
      />
    </>
  );
};

const SidebarRoot = ({
  children,
  gridArea = "nav",
  rootNode = {},
  Link,
  minLabelDepth = 1,
  maxInitialStackDepth,
  matchActiveNode,
  activeNodeId,
  idKey,
  initialDepth,
}) => {
  const {
    loading,
    lastClickedNodeId,
    lastClickedPath,
    lastClickedDepth,
    nextDepth,
    activeNodePath,
    onClickNode,
    acquireMutex,
    mutex,
    reset,
  } = useSidebar({
    contentTree: rootNode,
    activeNodeId,
    matchActiveNode,
    idKey,
    initialDepth,
  });

  return (
    <Box
      className="sgr-sidebar--root"
      sx={{
        gridArea,
        ...SidebarStyle.Container,
        ul: SidebarStyle.List,
        ".ul-wrapper": SidebarStyle.ListContainer,
        ".li-selector": SidebarStyle.Item,
        "span,a": SidebarStyle.Label,
      }}
      fontSize={2}
    >
      {children}
      <Sidebar
        loading={loading}
        rootNode={rootNode}
        Link={Link}
        minLabelDepth={minLabelDepth}
        maxInitialStackDepth={maxInitialStackDepth}
        activeNodeId={activeNodeId}
        lastClickedNodeId={lastClickedNodeId}
        lastClickedPath={lastClickedPath}
        lastClickedDepth={lastClickedDepth}
        activeNodePath={activeNodePath}
        onClickNode={onClickNode}
        acquireMutex={acquireMutex}
        mutex={mutex}
        nextDepth={nextDepth}
        initialDepth={initialDepth}
        reset={reset}
      />
    </Box>
  );
};

export default SidebarRoot;
