const path = require("path");
const compileContentTree = require("./compileContentTree");
const dayjs = require("dayjs");

const CONTENT_DIR = path.dirname(require.resolve("@splitgraph/content"));
const DOCS_DIR = `${path.join(CONTENT_DIR, "blog")}`;

const mostRecentFirst = (a, b) =>
  dayjs(a.metadata.date).isBefore(dayjs(b.metadata.date)) ? 1 : -1;

const blogPosts = compileContentTree({
  contentDir: DOCS_DIR,
  urlPrefix: "/blog",
  sort: mostRecentFirst,
  map: ({ item, flatTree }) => {
    if (!item.metadata || !item.metadata.related) {
      return {};
    }

    const enrichedRelated = [];

    for (let relatedID of item.metadata.related) {
      let relatedItem = flatTree.find(
        ({ metadata: { id } }) => id === relatedID
      );

      if (!relatedItem) {
        console.warn(
          `Warning: Could not find related blog post '${relatedID}'`
        );

        continue;
      }

      enrichedRelated.push({
        url: relatedItem.url,
        metadata: {
          ...relatedItem.metadata,

          // We aren't building a graph structure here... unset nested related
          related: undefined,
        },
      });
    }

    return {
      metadata: {
        ...item.metadata,
        related: enrichedRelated,
      },
    };
  },
});

module.exports = blogPosts;
