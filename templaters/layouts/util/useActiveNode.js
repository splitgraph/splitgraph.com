import { useMemo } from "react";
import { findNodeInTree } from "@splitgraph/lib/tree";

const useActiveNode = ({ router, contentTree }) => {
  // next client thinks we're in the _content directory (technically we are),
  // even though we rewrote the URL. TODO: Factor out Link/router handling
  const currentURL = useMemo(
    () => router.pathname.replace(/^\/\_content/gm, ""),
    [router]
  );

  const activeNode = useMemo(
    () =>
      findNodeInTree({
        root: contentTree,
        match: (node) => node.url && node.url === currentURL,
      }),
    [currentURL, contentTree]
  );

  const activeNodeId = useMemo(() => activeNode.nodeId, [activeNode]);
  const activeNodeDepth = useMemo(
    () =>
      activeNode.children && activeNode.children.length > 0
        ? activeNode.depth + 1
        : activeNode.depth,
    [activeNode]
  );

  const matchActiveNode = useMemo(
    () => (node) => node.url && node.url === currentURL,
    [currentURL]
  );

  return {
    currentURL,
    activeNode,
    activeNodeId,
    activeNodeDepth,
    matchActiveNode,
  };
};

export default useActiveNode;
