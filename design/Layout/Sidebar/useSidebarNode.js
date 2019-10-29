import { getListContainerStyle } from "./SidebarStyle";

// TODO: This was originally an actual hook, but atm it isn't actually using any
// hooks. However it will need them for local collapsed state in vertical mode.
const useSidebarNode = ({
  nodeId,
  onClickNode,
  acquireMutex,
  mutex,
  activeNodePath,
  lastClickedPath,
  activeNodeId,
  maxInitialStackDepth = Infinity,
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
  const hiddenHorizontally =
    depth > maxInitialStackDepth &&
    ((!isLastClicked &&
      !isInLastClickedPath &&
      (!isInActivePath || anythingBeenClicked)) ||
      (!isInActivePath && !isInLastClickedPath));

  const hiddenVertically = false;

  const childListContainerStyle = getListContainerStyle({
    isLastClicked,
    hiddenHorizontally,
    hiddenVertically,
    depth
  });

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
    anythingBeenClicked
  };
};

export default useSidebarNode;
