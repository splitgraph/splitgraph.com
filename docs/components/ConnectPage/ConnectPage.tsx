// @jsx jsx
// @ts-ignore
import { jsx, Box, StyleSystemObject } from "theme-ui";
import * as React from "react";

import {
  HeroConnectionParams,
  HeroSampleQuery,
  IHeroSampleQueryItem,
} from "@splitgraph/docs/components";

export interface IConnectPageProps {
  isAuthenticated?: boolean;
  showWelcomeMessage?: boolean;
  helpSection?: React.ReactNode;
  sampleQueries?: IHeroSampleQueryItem[];
}

const ConnectPage = ({
  isAuthenticated = false,
  showWelcomeMessage = false,
  helpSection,
  sampleQueries,
}: IConnectPageProps) => {
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
          ".left-col": {
            flexGrow: "1",
            backgroundColor: "primary",
            padding: 0,
            paddingBottom: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // paddingTop: "0 !important",
            // padding: ["2rem", "2rem", "4rem"],
            width: ["100%", "100%", "40%"],
            h1: {
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
              h1: {
                color: "primary",
              },
              // minHeight: "50%",
            },
            ".right-bot": {
              paddingTop: "2rem",
              // backgroundColor: "#ebebeb",
            },
          },
        } as StyleSystemObject
      }
    >
      <Box className="left-col">
        <h1>Connect Now</h1>
        <HeroConnectionParams isAuthenticated={isAuthenticated} />
      </Box>
      <Box className="right-col">
        <Box className="right-top">
          <h1>Send a Query in 60 Seconds</h1>
          {isAuthenticated && <Box>You are authenticated</Box>}
          {showWelcomeMessage && <Box>Welcome to Splitgraph</Box>}
          <HeroSampleQuery queries={sampleQueries} />
        </Box>
        <Box className="right-bot">{helpSection}</Box>
      </Box>
    </Box>
  );
};

export default ConnectPage;
