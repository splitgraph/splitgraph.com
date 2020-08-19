// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { BaseLayout, MainContent } from "@splitgraph/tdesign";
import { BlogPostMarketingNotice } from "../BlogPost/BlogPostMarketingNotice";
import { Link } from "../Link";

export interface ILandingPageLayoutProps {
  children?: React.ReactNode;
  showMarketingNotice?: boolean | React.ReactNode;
  includeDashboardHeaderLink?: boolean;
  includeConnectHeaderLink?: boolean;
}

const HeaderRight = ({
  includeDashboardHeaderLink = false,
  includeConnectHeaderLink = true,
}: Pick<
  ILandingPageLayoutProps,
  "includeDashboardHeaderLink" | "includeConnectHeaderLink"
>) => (
  <>
    <Link href="/blog" className="desktop-only">
      Blog
    </Link>
    <Link href="/docs">Docs</Link>
    {includeConnectHeaderLink && (
      <Link className="button-link--outline desktop-only" href="/connect">
        Connect
      </Link>
    )}
    {includeDashboardHeaderLink && (
      <a className="button-link--outline" href="/">
        Dashboard
      </a>
    )}
    <a className="button-link" href="/explore">
      Data
    </a>
  </>
);

export default ({
  children,
  showMarketingNotice = true,
  includeDashboardHeaderLink = false,
}: ILandingPageLayoutProps) => {
  const marketingNotice =
    showMarketingNotice && typeof showMarketingNotice === "boolean" ? (
      <BlogPostMarketingNotice />
    ) : (
      showMarketingNotice
    );

  return (
    <>
      {marketingNotice}
      <BaseLayout
        extraHeaderStyle={{
          borderWidth: "0 !important",
        }}
        renderHeaderRight={() => (
          <HeaderRight
            includeDashboardHeaderLink={includeDashboardHeaderLink}
          />
        )}
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
            ".button-link, .button-link-secondary": {
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
