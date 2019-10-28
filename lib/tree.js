const mapTree = ({
  root,
  callback = (item, parent, depth) => {},
  parent,
  twin = {},
  depth = 0
}) => {
  if (!root) {
    return;
  }

  root.children = root.children
    ? root.children.filter(c => !!c && Object.keys(c).length > 0 && !c.isMeta)
    : undefined;

  if (root.children) {
    twin.children = [];
    for (let i = 0; i < root.children.length; i++) {
      let node = root.children[i];
      twin.children.push(
        mapTree({
          root: node,
          callback: callback,
          parent: root,
          twin: twin.children[i],
          depth: depth + 1
        })
      );
    }
  }

  Object.assign(twin, callback(root, parent, depth));

  return twin;
};

const walkTree = ({
  root,
  callback = (item, parent, depth) => {},
  parent,
  depth = 0
}) => {
  if (!root) {
    return;
  }

  root.children = root.children
    ? root.children.filter(c => !!c && Object.keys(c).length > 0 && !c.isMeta)
    : undefined;

  if (root.children) {
    root.children.forEach(node =>
      walkTree({
        root: node,
        callback: callback,
        parent: root,
        depth: depth + 1
      })
    );
  }

  return callback(root, parent, depth);
};

const filterTree = ({ root, match = node => false }) => {
  const foundNodes = [];

  walkTree({
    root,
    callback: node => {
      if (match(node)) {
        foundNodes.push(node);
      }
    },
    parent: null
  });

  return foundNodes;
};

// TODO
// This should not loop over the whole tree. need a way to "break" from walk
// This is currently returning the *last* found node w/ this ID instead of the first,
// but IDs are supposed to be unique

//
// It would probably be best to simply memoize the chain of parents when walking the tree,
// but that requires picking ahead of time which is the "id" key (could be optionally passed)
//

const findNodeInTree = ({ root, match = node => false }) => {
  return filterTree({ root, match }).pop();
};

const findParentsOfNodeInTree = ({ root, match }) => {
  const parents = filterTree({
    root,
    match: node =>
      findNodeInTree({
        root: node,
        match
      })
  });

  return parents;
};

module.exports = {
  mapTree,
  walkTree,
  filterTree,
  findNodeInTree,
  findParentsOfNodeInTree
};
