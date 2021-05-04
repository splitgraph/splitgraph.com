import * as React from "react";

import { BaseLayout, MainContent, MuiLink as Link } from "@splitgraph/tdesign";
import { BlogPostMarketingNotice } from "../BlogPost/BlogPostMarketingNotice";

export interface ILandingPageLayoutProps {
  children?: React.ReactNode;
  showMarketingNotice?: boolean | React.ReactNode;
  includeDashboardHeaderLink?: boolean;
  includeConnectHeaderLink?: boolean;
  showHeader?: boolean;
  whitelabeled?: boolean;
  brand?: string;
}

const HeaderRight = ({
  includeDashboardHeaderLink = false,
  includeConnectHeaderLink = true,
  whitelabeled = false,
}: Pick<
  ILandingPageLayoutProps,
  "includeDashboardHeaderLink" | "includeConnectHeaderLink" | "whitelabeled"
>) => (
  <>
    {!whitelabeled && (
      <Link href="/blog" className="desktop-only">
        Blog
      </Link>
    )}
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

const LandingPageLayout = ({
  children,
  showHeader = true,
  showMarketingNotice = true,
  includeDashboardHeaderLink = false,
  includeConnectHeaderLink = false,
  whitelabeled = false,
  brand,
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
        showHeader={showHeader}
        extraHeaderStyle={{
          borderWidth: "0 !important",
        }}
        logoText={brand || undefined}
        renderHeaderRight={() => (
          <HeaderRight
            includeDashboardHeaderLink={includeDashboardHeaderLink}
            includeConnectHeaderLink={includeConnectHeaderLink}
            whitelabeled={whitelabeled}
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

export default LandingPageLayout;
