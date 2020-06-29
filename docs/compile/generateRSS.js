const RSS = require("rss");

const BASE_URL =
  process.env.SEO_CANONICAL_BASE_URL || "https://www.splitgraph.com";

const generateRSS = (posts) => {
  const siteURL = BASE_URL;

  const feed = new RSS({
    title: "Splitgraph Blog",
    description: "Splitgraph Blog - Work with data like code",
    site_url: `${siteURL}/blog`,
    feed_url: `${siteURL}/feed.xml`,
    generator: "Splitgraph",
  });

  for (let { url, metadata } of posts.children) {
    feed.item({
      title: metadata.title,
      url: `${siteURL}${url}`,
      date: metadata.date,
      description: metadata.description,
      ...(metadata.topics ? { categories: metadata.topics } : {}),
    });
  }

  return feed.xml({ indent: true });
};

module.exports = generateRSS;
