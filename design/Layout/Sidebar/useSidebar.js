import { useReducer, useMemo } from "react";

import { findNodeInTree, findParentsOfNodeInTree } from "@splitgraph/lib/tree";

const findParentsOfNode = ({ nodeId, contentTree, idKey }) => {
  return findParentsOfNodeInTree({
    root: contentTree,
    match: node => node[idKey] === nodeId
  });
};

const sidebarStateFromProps = ({
  contentTree,
  activeNodeId,
  matchActiveNode,
  idKey
}) => {
  if (!activeNodeId && matchActiveNode) {
    const activeNode = findNodeInTree({
      root: contentTree,
      match: matchActiveNode
    });
    activeNodeId = activeNode.nodeId;
  }

  return {
    activeNodeId,
    lastClickedNodeId: null,
    mutex: activeNodeId
  };
};

const SidebarActions = {
  ClickedNode: "clicked_node",
  AcquireMutex: "acquire_mutex"
};

const sidebarReducer = (state, action) => {
  switch (action.type) {
    case SidebarActions.ClickedNode:
      return {
        ...state,
        lastClickedNodeId: action.nodeId
      };
    case SidebarActions.AcquireMutex:
      return {
        ...state,
        mutex: action.nodeId
      };
  }
};

const useLastClickedPath = ({ contentTree, lastClickedNodeId, idKey }) => {
  return useMemo(
    () =>
      lastClickedNodeId
        ? [
            { nodeId: lastClickedNodeId },
            ...findParentsOfNode({
              nodeId: lastClickedNodeId,
              contentTree,
              idKey
            })
          ]
        : [],
    [lastClickedNodeId, idKey]
  );
};

const useActivePath = ({ contentTree, activeNodeId, idKey }) => {
  return useMemo(
    () =>
      activeNodeId
        ? [
            { nodeId: activeNodeId },
            ...findParentsOfNode({ nodeId: activeNodeId, contentTree, idKey })
          ]
        : [],
    [activeNodeId, idKey]
  );
};

const useSidebar = ({
  contentTree,
  activeNodeId,
  matchActiveNode,
  idKey = "nodeId"
}) => {
  const [state, dispatch] = useReducer(
    sidebarReducer,
    sidebarStateFromProps({ contentTree, activeNodeId, matchActiveNode, idKey })
  );

  const lastClickedPath = useLastClickedPath({
    contentTree,
    idKey,
    lastClickedNodeId: state.lastClickedNodeId
  });
  const activeNodePath = useActivePath({
    contentTree,
    idKey,
    activeNodeId: state.activeNodeId
  });

  const onClickNode = ({ nodeId }) =>
    dispatch({ type: SidebarActions.ClickedNode, nodeId });
  const acquireMutex = ({ nodeId }) =>
    dispatch({ type: SidebarActions.AcquireMutex, nodeId });

  return {
    ...state,
    lastClickedPath,
    activeNodePath,
    onClickNode,
    acquireMutex
  };
};

export default useSidebar;
