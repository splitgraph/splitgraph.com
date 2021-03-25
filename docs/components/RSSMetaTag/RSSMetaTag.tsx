/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";
import { Helmet } from "react-helmet";

const RSSMetaTag = () => {
  return (
    <Helmet>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Splitgraph RSS Feed"
        href="/feed.xml"
      />
    </Helmet>
  );
};

export default RSSMetaTag;
