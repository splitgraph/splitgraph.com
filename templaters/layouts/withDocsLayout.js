// @jsx jsx
import { jsx } from "theme-ui";
import React from "react";
import { DocSearch } from "@splitgraph/docs/components";
import withHolyGrailLayout from "./withHolyGrailLayout";

const getDocsSEO = ({ currentURL, meta, SEO_BASE_URL }) => {
  const isVersionedDocument = currentURL.includes("/versions/");

  if (!isVersionedDocument) {
    return {};
  }

  // e.g.:
  // /docs/python-api/versions/v0.1.0/splitgraph.engine.postgres
  //                  ^____delete___^
  // /docs/sgr/versions/v0.1.0/image-management-creation/checkout
  //          ^____delete____^
  const splitURL = currentURL.split("/");
  const versionsIndex = splitURL.findIndex((x) => x === "versions");
  splitURL.splice(versionsIndex, 2);
  const canonicalURL = splitURL.join("/");

  const injectSEO = {
    canonical: `${SEO_BASE_URL}${canonicalURL}`,
  };

  return injectSEO;
};

export default withHolyGrailLayout({
  titleTemplate: "%s - Documentation | Splitgraph",
  getSEO: getDocsSEO,
  renderDocsHeaderLink: false,
  middleHeader: <DocSearch />,
});
