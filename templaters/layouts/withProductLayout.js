/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import withHolyGrailLayout from "./withHolyGrailLayout";

export default withHolyGrailLayout({
  titleTemplate: "%s | Splitgraph",
  renderTOC: false,
  renderTitleHeading: true,
  renderInterPageNav: false,
});
