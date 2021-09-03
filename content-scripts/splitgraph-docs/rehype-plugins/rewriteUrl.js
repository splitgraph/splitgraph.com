/*
 Given a URL, rewrite it to be correct.

 sphinx generates links which are prefixed with an extra ../

 For now, this rewrite is simple: Just remove the leading ../

 If later we decide to manipulate the tree (i.e. move subpackages into a directory
  of their parent package), then rewrites will be more complicated
*/

const rewriteUrl = (url) => {
  const isLocalAnchor = url.hash && !url.path;

  if (isLocalAnchor) {
    return url.href;
  }

  if (!url.href.startsWith("../")) {
    return url.href;
  }

  const cleanedHref = url.href.slice(3);

  return cleanedHref;
};

module.exports = rewriteUrl;
