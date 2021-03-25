/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";
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
    helpSection,
    sampleQueries,
    namespace,
    repository,
    tableName,
    embed,
    whitelabeled,
    brand,
    host,
  } = useConnectPageData({ onboardingState, helpSectionComponents });

  return (
    <LandingPageLayout
      showMarketingNotice={showMarketingNotice}
      includeDashboardHeaderLink={isAuthenticated}
      includeConnectHeaderLink={false}
      showHeader={!embed}
      whitelabeled={whitelabeled === "1"}
      brand={brand}
      showFooter={whitelabeled ? false : true}
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
        whitelabeled={whitelabeled === "1"}
        host={host}
      />
      {!embed && !whitelabeled && <Footer Link={Link} />}
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
