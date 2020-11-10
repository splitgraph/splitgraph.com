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
    helpSection,
    sampleQueries,
    namespace,
    repository,
    tableName,
    embed,
  } = useConnectPageData({ helpSectionComponents });

  return (
    <LandingPageLayout
      showMarketingNotice={false}
      includeConnectHeaderLink={false}
      showHeader={!embed}
    >
      <NextSeo title="Connect to the DDN" />
      <ConnectPage
        isAuthenticated={isAuthenticated}
        helpSection={helpSection}
        sampleQueries={sampleQueries}
        namespace={namespace}
        repository={repository}
        tableName={tableName}
        embed={embed}
      />
      {!embed && <Footer Link={Link} />}
    </LandingPageLayout>
  );
};

export async function getStaticProps() {
  return getStaticPropsForConnectPage();
}

export default withTheme(OuterConnectPage);
