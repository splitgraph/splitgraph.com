// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { BaseLayout, MainContent } from "@splitgraph/tdesign";
import { HeaderRight } from "../HeaderRight";

export interface ILandingPageLayoutProps {
  children?: React.ReactNode;
}

export default ({ children }: ILandingPageLayoutProps) => {
  return (
    <BaseLayout
      extraHeaderStyle={{
        borderWidth: "0 !important",
      }}
      renderHeaderRight={() => <HeaderRight />}
    >
      <MainContent
        extraStyle={{
          ".lp-section": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            h1: {
              fontSize: ["1.75rem", "1.75rem", "3rem"],
            },
            h2: {
              fontSize: ["1.25rem", "1.25rem", "2rem"],
              marginBottom: "2rem",
            },
            ".mobile-line-break": {
              display: ["block", "block", "none"],
            },
            "pre, code": {
              textAlign: "initial",
              // maxWidth: "100%",
            },
          },
        }}
      >
        {children}
      </MainContent>
    </BaseLayout>
  );
};
