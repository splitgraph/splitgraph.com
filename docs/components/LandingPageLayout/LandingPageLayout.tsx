// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { BaseLayout, MainContent } from "@splitgraph/tdesign";
import { BlogPostMarketingNotice } from "../BlogPost/BlogPostMarketingNotice";
import { HeaderRight } from "../HeaderRight";

export interface ILandingPageLayoutProps {
  children?: React.ReactNode;
}

export default ({ children }: ILandingPageLayoutProps) => {
  return (
    <>
      <BlogPostMarketingNotice />
      <BaseLayout
        extraHeaderStyle={{
          borderWidth: "0 !important",
        }}
        renderHeaderRight={() => <HeaderRight />}
      >
        <MainContent
          extraStyle={{
            h2: {
              fontSize: ["1.25rem", "1.25rem", "2rem"],
              marginBottom: "2rem",
            },
            h1: {
              fontSize: ["1.75rem", "1.75rem", "2.5rem"],
            },
            "pre, code": {
              textAlign: "initial",
              // maxWidth: "100%",
            },
            ".mobile-line-break": {
              display: ["block", "block", "none"],
            },
            ".lp-section": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            ".button-link": {
              fontSize: [
                "1.5rem !important",
                "1.5rem !important",
                "2rem !important",
              ],
              padding: "1rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            },
          }}
        >
          {children}
        </MainContent>
      </BaseLayout>
    </>
  );
};
