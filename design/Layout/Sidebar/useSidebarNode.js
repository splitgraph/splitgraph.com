import { getListContainerStyle, getListStyle } from "./SidebarStyle";

// TODO: This was originally an actual hook, but atm it isn't actually using any
// hooks. However it will need them for local collapsed state in vertical mode.
const useSidebarNode = ({
  nodeId,
  parentNodeId,
  onClickNode,
  acquireMutex,
  mutex,
  activeNodePath,
  lastClickedPath,
  activeNodeId,
  maxInitialStackDepth = Infinity,
  minLabelDepth = 0,
  depth
}) => {
  // const [isLocalCollapsed, setLocalCollapsed] = useState(depth > maxInitialStackDepth)

  const isActiveNode = nodeId === activeNodeId;
  const anythingBeenClicked = lastClickedPath.length > 0;

  // second clause is necessary to disambiguate from mutex === nodeId && nodeId === activeNodeId
  // because the mutex is set to the activeNodeId on initial load
  const isLastClicked = mutex === nodeId && anythingBeenClicked;

  const isInActivePath =
    isActiveNode || !!activeNodePath.find(node => node.nodeId === nodeId);

  const isInLastClickedPath = !!lastClickedPath.find(
    node => node.nodeId === nodeId
  );

  // TODO: fixme
  // Yes, this is a monstrosity, I didn't even understand it five minutes
  // after writing it. At this point, mutex is actually redundant, since we
  // have lastClickedInPath, lastClickedNodeId, and nodeId.
  const notExplicitlyShown =
    (!isLastClicked &&
      !isInLastClickedPath &&
      (!isInActivePath || anythingBeenClicked)) ||
    (!isInActivePath && !isInLastClickedPath);

  const hiddenHorizontally = depth > maxInitialStackDepth && notExplicitlyShown;

  const hiddenVertically = depth - minLabelDepth > 0 && notExplicitlyShown;

  const childListContainerStyle = getListContainerStyle({
    isLastClicked,
    hiddenHorizontally,
    hiddenVertically,
    depth,
    minLabelDepth
  });

  const childListStyle = getListStyle({
    isInActivePath
  });

  // The "bottom leafs" (other than the active one)
  const isChildOfActiveParent =
    parentNodeId && activeNodePath.find(n => n.nodeId === parentNodeId)
      ? true
      : false;

  const isChildOfClickedParent =
    parentNodeId && mutex === parentNodeId ? true : false;

  const onClick = () => {
    acquireMutex({ nodeId });
    onClickNode({ nodeId });
  };

  return {
    isActiveNode,
    isLastClicked,
    isInActivePath,
    isInLastClickedPath,
    onClick,
    childListContainerStyle,
    childListStyle,
    anythingBeenClicked,
    isChildOfActiveParent,
    isChildOfClickedParent
  };
};

export default useSidebarNode;
