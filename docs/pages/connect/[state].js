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

const OnboardingConnectPage = ({ onboardingState, helpSectionComponents }) => {
  const {
    isAuthenticated,
    showMarketingNotice,
    showWelcomeMessage,
    helpSection,
    sampleQueries,
  } = useConnectPageData({ onboardingState, helpSectionComponents });

  return (
    <LandingPageLayout showMarketingNotice={showMarketingNotice}>
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

export async function getStaticProps({ params: { state } }) {
  const existing = await getStaticPropsForConnectPage();

  return {
    ...existing,
    props: {
      onboardingState: state,
      ...existing.props,
    },
  };
}

export async function getStaticPaths() {
  const possibleStates = ["post-auth", "post-auth-welcome"];

  return {
    paths: possibleStates.map((state) => ({ params: { state } })),
    fallback: false,
  };
}

export default withTheme(OnboardingConnectPage);