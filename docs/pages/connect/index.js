import { NextSeo } from "next-seo";
import { Footer } from "@splitgraph/tdesign";
import {
  LandingPageLayout,
  ConnectPage,
  useConnectPageData,
  getStaticPropsForConnectPage,
} from "@splitgraph/docs/components";
import { withMUITheme, MuiLink as Link } from "@splitgraph/tdesign";

const OuterConnectPage = ({ helpSectionComponents }) => {
  const {
    isAuthenticated,
    helpSection,
    sampleQueries,
    namespace,
    repository,
    tableName,
    embed,
    whitelabeled,
    brand,
    host,
  } = useConnectPageData({ helpSectionComponents });

  return (
    <LandingPageLayout
      showMarketingNotice={false}
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

export async function getStaticProps() {
  return getStaticPropsForConnectPage();
}

export default withMUITheme(OuterConnectPage);
