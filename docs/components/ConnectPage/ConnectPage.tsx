import { Box } from "@material-ui/core";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles";

import { HeroConnectionParams } from "../HeroConnectionParams";
import { HeroSampleQuery, IHeroSampleQueryItem } from "../HeroSampleQuery";

export interface IConnectPageProps {
  isAuthenticated?: boolean;
  helpSection?: React.ReactNode;
  sampleQueries?: IHeroSampleQueryItem[];
  repository?: string;
  namespace?: string;
  tableName?: string;
  embed?: boolean;
  whitelabeled?: boolean;
  host?: string;
}

const ConnectPage = ({
  isAuthenticated = false,
  helpSection,
  sampleQueries,
  namespace,
  repository,
  embed = false,
  whitelabeled = false,
  host,
}: IConnectPageProps) => {
  const cameFromRepo = !!namespace && !!repository;

  const originRepoLink = cameFromRepo ? `/${namespace}/${repository}` : null;

  return (
    <Box
      sx={
        {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          flexGrow: "1",
          width: "100%",
          maxWidth: "100vw",
          h1: {
            textAlign: "center",
          },
          h2: {
            textAlign: "center",
            fontWeight: 200,
            marginTop: 0,
          },
          ".left-col": {
            flexGrow: "1",
            backgroundColor: "primary.main",
            padding: 0,
            paddingBottom: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // paddingTop: "0 !important",
            // padding: ["2rem", "2rem", "4rem"],
            width: ["100%", "100%", "40%"],
            "h1, h2": {
              color: "white",
            },
          },
          ".right-col": {
            flexGrow: "1",
            backgroundColor: "#fff",
            width: ["100%", "100%", "60%"],
            paddingLeft: ["1rem", "1rem", "calc((100% - 90%) / 2)"],
            paddingRight: ["1rem", "1rem", "calc((100% - 90%) / 2)"],
            ".right-top,.right-bot": {
              padding: ["2rem", "2rem", "4rem"],
            },
            ".right-top": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0",
              backgroundColor: "white",
              "h1, h2": {
                color: "primary.main",
              },
              // minHeight: "50%",
            },
            ".right-bot": {
              paddingTop: "2rem",
              // backgroundColor: "#ebebeb",
            },
          },
        } as SxProps<Theme>
      }
    >
      <Box className="left-col">
        <h1>Connect Now</h1>
        <h2>Compatible with most SQL clients</h2>
        <HeroConnectionParams
          host={host}
          isAuthenticated={isAuthenticated}
          embed={embed}
        />
      </Box>
      <Box className="right-col">
        <Box className="right-top">
          <h1>Send a Query in 60 Seconds</h1>
          {whitelabeled ? (
            <h2>Query data with standard SQL</h2>
          ) : (
            <h2>Query 40k+ datasets with standard SQL</h2>
          )}
          {sampleQueries && <HeroSampleQuery queries={sampleQueries} />}
          {cameFromRepo && (
            <Box
              sx={{
                // backgroundColor: "sglightblue",
                paddingTop: "1rem",
                // border: "1px solid",
                // borderColor: "primary.main",
                color: "heavy",
                width: "100%",
                a: {
                  // textDecoration: "underline",
                },
                ":before": {
                  content: '"\\27F5"',
                  paddingRight: "1ch",
                },
              }}
            >
              {originRepoLink && (
                <a href={originRepoLink}>
                  Back to {`${namespace}/${repository}`}
                </a>
              )}
            </Box>
          )}
        </Box>
        <Box className="right-bot">{helpSection}</Box>
      </Box>
    </Box>
  );
};

export default ConnectPage;
