// @jsx jsx
// @ts-ignore
import { jsx, Box, Text } from "theme-ui";
import * as React from "react";

import {
  PreWithCopy,
  GitHubOAuthButton,
  GitLabOAuthButton,
  GoogleOAuthButton,
} from "@splitgraph/tdesign";

export interface IHeroConnectionParamsProps {
  redirectURL?: string;
}

const HeroConnectionParams = ({
  redirectURL = "/connect?auth=1&welcome=1",
}: IHeroConnectionParamsProps) => {
  return (
    <Box
      className="hero-subsection hero-subsection--splitfile hero--connection-params"
      sx={{
        backgroundColor: "white",
        color: "primary",
        maxWidth: "90vw",
        boxShadow: "card",
        // minWidth: ["calc(100vw - 4rem)", "400px", "400px"],
        // minHeight: "600px",
        padding: ["1rem", "2rem", "2rem"],
      }}
    >
      <Box
        sx={{
          width: "100%",
          h2: {
            color: "heavy",
          },
        }}
      >
        <Box className="value-area">
          <PreWithCopy title={"Host"} extraStyle={{ marginBottom: "1rem" }}>
            {"data.splitgraph.com"}
          </PreWithCopy>
        </Box>

        <Box className="value-area">
          <PreWithCopy title={"Port"} extraStyle={{ marginBottom: "1rem" }}>
            {"5432"}
          </PreWithCopy>
        </Box>

        <Box className="value-area">
          <PreWithCopy
            title={"Database Name"}
            extraStyle={{ marginBottom: "1rem" }}
          >
            {"ddn"}
          </PreWithCopy>
        </Box>

        <Box className="value-area">
          <PreWithCopy
            title={"Connection URI"}
            extraStyle={{ marginBottom: "1rem" }}
          >
            {"postgresql://data.splitgraph.com/ddn"}
          </PreWithCopy>
        </Box>

        <Box>
          <Text sx={{ color: "heavy", fontWeight: "bold", display: "block" }}>
            Username / Password
          </Text>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              form: {
                marginBottom: "1rem",
                marginTop: "1rem",
                marginLeft: ["0.5rem", "1rem", "1rem"],
                marginRight: ["0.5rem", "1rem", "1rem"],
              },
              // padding: "1rem",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "gray",
              a: {
                variant: "links.primary",
                textDecoration: "underline",
                marginBottom: "1rem",
              },
            }}
          >
            <GitHubOAuthButton redirectURL={redirectURL} />
            <GitLabOAuthButton redirectURL={redirectURL} />
            <GoogleOAuthButton redirectURL={redirectURL} />
            <a
              href={`/auth/sign_up?redirect=${encodeURIComponent(redirectURL)}`}
            >
              Or, Signup with Email & Password
            </a>
          </Box>
        </Box>
      </Box>
      {/* <CambridgeChicagoJOIN components={mdxComponents} /> */}
    </Box>
  );
};

export default HeroConnectionParams;
