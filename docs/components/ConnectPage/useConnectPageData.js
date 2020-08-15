import dynamic from "next/dynamic";

import ConnectPageMarketingNotice from "./ConnectPageMarketingNotice";

// Note this needs to be a JS file so it can import mdx files
import CambridgeChicagoJOIN from "@splitgraph/content/marketing/sample-queries/CambridgeChicagoJOIN.mdx";
import NewSocrataDatasets from "@splitgraph/content/marketing/sample-queries/NewSocrataDatasets.mdx";

import { mdxComponents } from "@splitgraph/design";

const useConnectPageData = ({ helpSectionComponents, onboardingState }) => {
  const isAuthenticated = onboardingState === "post-auth";
  const showWelcomeMessage = onboardingState === "post-auth-welcome";

  const showMarketingNotice = showWelcomeMessage ? (
    <ConnectPageMarketingNotice onboardingState={onboardingState} />
  ) : (
    false
  );

  // The relative path is fragile, but it's the best solution I've found in dev so far
  // Also note that this does not support SSR
  const HelpsSections = (helpSectionComponents || []).map(({ ComponentName }) =>
    dynamic(() =>
      import(`../../../content/sql-client-instructions/${ComponentName}.mdx`)
    )
  );

  const helpSection = (
    <>
      {HelpsSections.map((HelpsSectionMarkdownComponent, index) => (
        <HelpsSectionMarkdownComponent key={index} components={mdxComponents} />
      ))}
    </>
  );

  const sampleQueries = [
    {
      snippet: (
        <CambridgeChicagoJOIN
          components={mdxComponents}
          key={"cambridge_chicago_sql"}
        />
      ),
      description: "Join across tables from live datasets",
    },
    {
      snippet: (
        <NewSocrataDatasets
          components={mdxComponents}
          key={"new_socrata_datasets"}
        />
      ),
      description: "Travel back in time and query multiple versions at once",
    },
  ];

  return {
    isAuthenticated,
    showMarketingNotice,
    showWelcomeMessage,
    helpSection,
    sampleQueries,
  };
};

export default useConnectPageData;
