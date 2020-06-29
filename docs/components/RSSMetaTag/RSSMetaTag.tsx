// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";
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
