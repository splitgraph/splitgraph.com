/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box, Text } from "theme-ui";
import IframeResizer from "iframe-resizer-react";

import {
  PreWithCopy,
  GitHubOAuthButton,
  GitLabOAuthButton,
  GoogleOAuthButton,
} from "@splitgraph/tdesign";

export interface IHeroConnectionParamsProps {
  redirectURL?: string;
  isAuthenticated?: boolean;
  embed?: boolean;
  host?: string;
}

const HeroConnectionParams = ({
  redirectURL = "/connect/post-auth-welcome",
  isAuthenticated = false,
  embed = false,
  host = "data.splitgraph.com",
}: IHeroConnectionParamsProps) => {
  if (embed) {
    // TODO: Use proper URL building (will break if query params in original URL)
    redirectURL = `${redirectURL}?embed=1`;
  }

  return (
    <Box
      className="hero-subsection hero-subsection--splitfile hero--connection-params"
      sx={{
        backgroundColor: "white",
        color: "primary",
        // maxWidth: "90vw",
        boxShadow: "card",
        // minWidth: ["calc(100vw - 4rem)", "400px", "400px"],
        // minHeight: "600px",
        maxWidth: [
          "min(100%, calc(300px + 2rem))",
          "min(100%, calc(300px + 4rem))",
          "min(100%, calc(300px + 4rem))",
        ],
        padding: ["1rem", "2rem", "2rem"],
        alignItems: "center",
        ".value-area": {
          maxWidth: ["calc(100vw - 4rem)", "300px", "300px"],
        },
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
            {host}
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
            {`postgresql://${host}/ddn`}
          </PreWithCopy>
        </Box>

        {isAuthenticated ? (
          <IframeResizer
            src="/settings/embedded/sql-credentials"
            style={{
              width: "1px",
              minWidth: "100%",
              border: "none",
              background: "none",
            }}
          />
        ) : (
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
                href={`/auth/sign_up?redirect=${encodeURIComponent(
                  redirectURL
                )}`}
              >
                Or, Sign Up with Email & Password
              </a>
            </Box>
          </Box>
        )}
      </Box>
      {/* <CambridgeChicagoJOIN components={mdxComponents} /> */}
    </Box>
  );
};

export default HeroConnectionParams;
