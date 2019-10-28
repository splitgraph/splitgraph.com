// @jsx jsx
import { jsx } from "theme-ui";

import { Box } from "@splitgraph/design";

import useSidebar from "./useSidebar";

import SidebarStyle from "./SidebarStyle";
import useSidebarNode from "./useSidebarNode";

const SidebarNode = ({
  Link,
  minLabelDepth,
  maxInitialStackDepth,
  node: { depth, nodeId, url, slug, metadata: { title } = {}, children },
  activeNodeId,
  lastClickedNodeId,
  lastClickedPath,
  activeNodePath,
  onClickNode,
  acquireMutex,
  mutex
}) => {
  const { onClick, childListContainerStyle } = useSidebarNode({
    nodeId,
    onClickNode,
    acquireMutex,
    mutex,
    activeNodePath,
    lastClickedPath,
    activeNodeId,
    maxInitialStackDepth,
    depth
  });

  const item = (
    <>
      {url ? (
        <Link href={url}>
          <a>{title}</a>
        </Link>
      ) : depth >= minLabelDepth ? (
        <span onClick={onClick}>{title}</span>
      ) : null}
      {children && (
        <div className="ul-wrapper" sx={childListContainerStyle}>
          <ul key={`${slug}`}>
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

  return depth < minLabelDepth ? item : <li>{item}</li>;
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
        position: "relative",
        left: 0,
        right: 0,
        "@media (max-width: 768px)": {
          marginTop: "-2rem"
        },
        ul: SidebarStyle.List,
        ".ul-wrapper": SidebarStyle.ListContainer,
        li: SidebarStyle.ListItem,
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
