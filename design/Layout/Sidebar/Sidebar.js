// @jsx jsx
import { jsx } from "theme-ui";

import { Box } from "@splitgraph/design";

import useSidebar from "./useSidebar";

import SidebarStyle from "./SidebarStyle";
import useSidebarNode from "./useSidebarNode";

import SidebarLabel from "./SidebarLabel";

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
  mutex
}) => {
  const {
    depth,
    nodeId,
    parentNodeId,
    url,
    slug,
    metadata: { title } = {},
    children
  } = node;

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
    isChildOfActiveParent
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
    depth
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
            {children.map(child => (
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
  mutex
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
        />
      </ul>
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
  idKey
}) => {
  const {
    lastClickedNodeId,
    lastClickedPath,
    activeNodePath,
    onClickNode,
    acquireMutex,
    mutex
  } = useSidebar({
    contentTree: rootNode,
    activeNodeId,
    matchActiveNode,
    idKey
  });

  return (
    <Box
      sx={{
        gridArea,
        ...SidebarStyle.Container,
        ul: SidebarStyle.List,
        ".ul-wrapper": SidebarStyle.ListContainer,
        ".li-selector": SidebarStyle.Item,
        "span,a": SidebarStyle.Label
      }}
      fontSize={2}
    >
      {children}
      <Sidebar
        rootNode={rootNode}
        Link={Link}
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
    </Box>
  );
};

export default SidebarRoot;
