import { useReducer, useMemo, useEffect } from "react";

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
    lastClickedDepth: null,
    nextDepth: null,
    mutex: activeNodeId,
    loading: false
  };
};

const SidebarActions = {
  ClickedNode: "clicked_node",
  AcquireMutex: "acquire_mutex",
  Reset: "reset",
  SetLoading: "set_loading"
};

const sidebarReducer = (state, action) => {
  switch (action.type) {
    case SidebarActions.ClickedNode:
      return {
        ...state,
        lastClickedNodeId: action.nodeId,
        lastClickedDepth: action.depth,
        nextDepth: action.nextDepth,
        ...(action.setActive
          ? {
              activeNodeId: action.nodeId,
              loading: action.loading ? true : false
            }
          : {})
      };
    case SidebarActions.AcquireMutex:
      return {
        ...state,
        mutex: action.nodeId
      };
    case SidebarActions.Reset:
      return {
        ...state,
        mutex: state.activeNodeId,
        lastClickedNodeId: null,
        lastClickedDepth: null,
        nextDepth: null,
        loading: false
      };
    case SidebarActions.SetLoading:
      return {
        ...state,
        loading: true
      };
    case SidebarActions.CompleteLoading:
      return {
        ...state,
        loading: false
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

const useSetLoadedWhenWindowLoads = ({ completeLoading }) => {
  useEffect(() => {
    window.addEventListener("load", completeLoading);

    return () => window.removeEventListener("load", completeLoading);
  }, [completeLoading]);
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

  // TODO: Pass dispatch down instead of redundant callbacks
  const onClickNode = ({ nodeId, depth, loading, setActive, nextDepth }) =>
    dispatch({
      type: SidebarActions.ClickedNode,
      nodeId,
      depth,
      loading,
      setActive,
      nextDepth
    });
  const acquireMutex = ({ nodeId }) =>
    dispatch({ type: SidebarActions.AcquireMutex, nodeId });

  const reset = () => dispatch({ type: SidebarActions.Reset });

  const completeLoading = () =>
    dispatch({ type: SidebarActions.CompleteLoading });

  useSetLoadedWhenWindowLoads({ completeLoading });

  return {
    ...state,
    lastClickedPath,
    activeNodePath,
    onClickNode,
    acquireMutex,
    reset
  };
};

export default useSidebar;
