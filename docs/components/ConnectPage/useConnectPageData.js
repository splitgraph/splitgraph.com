import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import ConnectPageMarketingNotice from "./ConnectPageMarketingNotice";

// Note this needs to be a JS file so it can import mdx files
import CambridgeChicagoJOIN from "@splitgraph/content/marketing/sample-queries/CambridgeChicagoJOIN.mdx";
import NewSocrataDatasets from "@splitgraph/content/marketing/sample-queries/NewSocrataDatasets.mdx";
import QOZTractBigQuery from "@splitgraph/content/marketing/sample-queries/QOZTractBigQuery.mdx";
import PostGISGeoData from "@splitgraph/content/marketing/sample-queries/PostGISGeoData.mdx";

import { mdxComponents } from "@splitgraph/design";

import HelpSectionList from "./HelpSectionList";
import useHasSessionCookie from "./useHasSessionCookie";

const useConnectPageData = ({ helpSectionComponents, onboardingState }) => {
  const isAuthenticated = ["post-auth", "post-auth-welcome"].includes(
    onboardingState
  );

  const router = useRouter();
  const {
    query: {
      namespace,
      repository,
      imageHash,
      tableName,
      embed,
      whitelabeled,
      brand,
      host,
    },
  } = router;

  const { hasSessionCookie } = useHasSessionCookie();

  const redirect =
    isAuthenticated && hasSessionCookie === false
      ? {
          pathname: "/connect",
          query: router.query,
          asPath: "/connect",
        }
      : !isAuthenticated && hasSessionCookie === true
      ? {
          pathname: "/connect/post-auth",
          query: router.query,
          asPath: "/connect/[state]",
        }
      : null;

  useEffect(() => {
    if (redirect) {
      router.push(redirect);
    }
  }, [hasSessionCookie, isAuthenticated, redirect]);

  const showWelcomeMessage = onboardingState === "post-auth-welcome";

  const showMarketingNotice = showWelcomeMessage ? (
    <ConnectPageMarketingNotice onboardingState={onboardingState} />
  ) : (
    false
  );

  // The relative path is fragile, but it's the best solution I've found in dev so far
  // Also note that this does not support SSR
  const HelpSections = (helpSectionComponents || []).map(({ ComponentName }) =>
    dynamic(() =>
      import(`../../../content/sql-client-instructions/${ComponentName}.mdx`)
    )
  );

  const helpSection = (
    <HelpSectionList
      HelpSections={HelpSections}
      mdxComponents={mdxComponents}
    />
  );

  const queryPreviewURL =
    namespace && repository && imageHash && tableName
      ? `/${namespace}/${repository}/${imageHash}/-/embedded-query-preview/${tableName}`
      : null;

  const identifier =
    namespace && repository && imageHash
      ? `${namespace}/${repository}:${imageHash}`
      : null;

  const sampleQueries = [
    ...(queryPreviewURL && identifier && tableName
      ? [
          {
            snippet: (
              <iframe
                key={"table-preview-iframe"}
                src={queryPreviewURL}
                allowtransparency="true"
                style={{
                  left: 0,
                  top: 0,
                  minWidth: "100%",
                  width: "100%",
                  border: "none",
                  background: "#36678d",
                  overflowY: "hidden",
                  minHeight: "20rem",
                }}
              />
            ),
            description: `Query records in ${tableName}`,
          },
        ]
      : []),
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
    {
      snippet: (
        <QOZTractBigQuery
          components={mdxComponents}
          key={"qoz_tract_big_query"}
        />
      ),
      description: "All the features of SQL are available to you ",
    },
    {
      snippet: (
        <PostGISGeoData components={mdxComponents} key={"postgis_geodata"} />
      ),
      description: "Support for PostGIS and geospatial queries",
    },
  ];

  return {
    embed: !!embed,
    namespace,
    repository,
    imageHash,
    tableName,
    queryPreviewURL,
    isAuthenticated,
    showMarketingNotice,
    showWelcomeMessage,
    helpSection,
    sampleQueries,
    whitelabeled,
    brand,
    host,
  };
};

export default useConnectPageData;
