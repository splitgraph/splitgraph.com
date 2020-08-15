// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import React from "react";
import { NextSeo } from "next-seo";
import { Footer } from "@splitgraph/tdesign";
import {
  Link,
  LandingPageLayout,
  ConnectPage,
  useConnectPageData,
  getStaticPropsForConnectPage,
} from "@splitgraph/docs/components";
import withTheme from "../../hocs/withTheme";

const OuterConnectPage = ({ helpSectionComponents }) => {
  const {
    isAuthenticated,
    showWelcomeMessage,
    helpSection,
    sampleQueries,
  } = useConnectPageData({ helpSectionComponents });

  return (
    <LandingPageLayout showMarketingNotice={false}>
      <NextSeo title="Connect to the DDN" />
      <ConnectPage
        isAuthenticated={isAuthenticated}
        showWelcomeMessage={showWelcomeMessage}
        helpSection={helpSection}
        sampleQueries={sampleQueries}
      />
      <Footer Link={Link} />
    </LandingPageLayout>
  );
};

export async function getStaticProps() {
  return getStaticPropsForConnectPage();
}

export default withTheme(OuterConnectPage);
