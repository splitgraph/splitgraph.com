import * as React from "react";
import { Box } from "@material-ui/core";

import FooterSection from "./FooterSection";
import NewsletterSignup from "./NewsletterSignup";

import {
  IconLogoDiscord,
  IconLogoGitHub,
  IconLogoTwitter,
  IconLogoLinkedIn,
  IconLogoReddit,
  IconRss,
  IconHeart,
} from "../../Icon";

export interface IFooterProps {
  Link?: React.FunctionComponent<any>;
  extraStyle?: object;
  footerVariant?: "dark";
}

const darkVariant = {
  ".footer-section-header": {
    color: "muted",
  },
  ul: {},
  a: {
    variant: "links.muted",
  },
  backgroundColor: "primary",
  borderTop: "0.5ch solid",
  borderTopColor: "lightaccent",
};

const mixStyles = (property: string, ...styles: object[]) => {
  return styles.reduce(
    (mix, style) => ({
      ...mix,
      ...(style.hasOwnProperty(property) ? style[property] : {}),
    }),
    {}
  );
};

const Footer = ({
  Link,
  footerVariant = "dark",
  extraStyle = {},
}: IFooterProps) => {
  // only one footer variant for now
  const baseVariant = footerVariant === "dark" ? darkVariant : darkVariant;

  return (
    <Box
      className="splitgraph-footer"
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "8rem",
        paddingTop: "4rem",
        paddingLeft: ["2rem", "2rem", "max(3rem, calc((100vw - 100ch)/2))"],
        paddingRight: ["2rem", "2rem", "max(3rem, calc((100vw - 100ch)/2))"],
        ...baseVariant,
        ...extraStyle,
        ".footer-links-row": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          ...mixStyles(".footer-links-row", baseVariant, extraStyle),
        },
        ".footer-section": {
          flexGrow: 0,
          flexShrink: 1,
          minWidth: ["inherit", "16ch", "16ch"], // Make length of longest item ("Terms of Service") to line up end columns
          ...mixStyles(".footer-section", baseVariant, extraStyle),
        },
        ".footer-community-row, .footer-copyright-row": {
          marginTop: "2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          ...mixStyles(".footer-community-row", baseVariant, extraStyle),
        },
        ".footer-copyright-row": {
          fontSize: "small",
          textTransform: "uppercase",
          color: "muted",
          // justifyContent: "center",
        },
        ".footer-section-header": {
          textTransform: "uppercase",
          fontSize: "small",
          ...mixStyles(".footer-section-header", baseVariant, extraStyle),
        },
        ".community-logos": {
          display: "flex",
          a: {
            variant: "links.unstyled",
          },
          // marginBottom: ["2rem", "inherit", "inherit"],
          ...mixStyles(".community-logos", baseVariant, extraStyle),
        },
        ".discord-cta-link": {
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          marginTop: ["-0.5rem"],
          borderRadius: "1rem",
          border: "1px solid",
          borderColor: "white",
          marginBottom: ["2rem", "inherit", "inherit"],
          ...mixStyles(".discord-cta-link", baseVariant, extraStyle),
          ":hover": {
            borderColor: "lightaccent",
            textDecoration: "none",
            ...mixStyles(".discord-cta-link:hover", baseVariant, extraStyle),
          },
        },
        ul: {
          listStyleType: "none",
          padding: 0,
          ...mixStyles("ul", baseVariant, extraStyle),
        },
      }}
    >
      <Box className="footer-links-row">
        <FooterSection
          Link={Link}
          header={"Product"}
          links={[
            ["/", "Home"],
            ["/explore", "Explore Data"],
            ["/connect", "Connect to DDN"],
            ["/auth/sign_in", "Sign In"],
            ["/auth/sign_up", "Sign Up"],
          ]}
        />

        <FooterSection
          Link={Link}
          header={"Support"}
          links={[
            ["/docs", "Documentation"],
            ["/docs/getting-started/frequently-asked-questions", "FAQ"],
            [
              "https://github.com/splitgraph/splitgraph/tree/master/examples",
              "Examples",
            ],
            ["/product/splitgraph/integrations", "Integrations"],
            ["/product/splitgraph/use-cases", "Use Cases"],
          ]}
        />

        <FooterSection
          Link={Link}
          header={"Company"}
          links={[
            ["/blog", "Blog"],
            ["/about/company/private-cloud-beta", "Private Cloud Beta"],
            ["/about/company/team", "Team"],
            ["/about/company/contact", "Contact"],
          ]}
        />
      </Box>
      <Box className="footer-community-row">
        <Box className="footer-section">
          <h3 className="footer-section-header">Community</h3>
          <Box className="community-logos">
            <a
              href="https://www.github.com/splitgraph/splitgraph"
              title="Splitgraph on GitHub"
              aria-label="Splitgraph on GitHub"
            >
              <IconLogoGitHub
                size={"2rem"}
                extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/12620006/"
              title="Splitgraph on LinkedIn"
              aria-label="Splitgraph on LinkedIn"
            >
              <IconLogoLinkedIn
                size={"2rem"}
                extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
              />
            </a>
            <a
              href="https://www.twitter.com/splitgraph"
              title="Splitgraph on Twitter (@splitgraph)"
              aria-label="Splitgraph on Twitter (@splitgraph)"
            >
              <IconLogoTwitter
                size={"2rem"}
                extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
              />
            </a>
            <a
              href="https://www.reddit.com/r/splitgraph"
              title="Splitgraph on Reddit (r/splitgraph)"
              aria-label="Splitgraph on Reddit (r/splitgraph)"
            >
              <IconLogoReddit
                size={"2rem"}
                extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
              />
            </a>
            <a
              href="/feed.xml"
              title="Splitgraph Blog RSS Feed"
              aria-label="Splitgraph Blog RSS Feed"
            >
              <IconRss
                size={"2rem"}
                extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
              />
            </a>
          </Box>
        </Box>

        <Box className="footer-section">
          <h3 className="footer-section-header">&nbsp;</h3>
          <a className="discord-cta-link" href="https://discord.gg/eFEFRKm">
            {" "}
            <IconLogoDiscord
              size={"2rem"}
              extraStyle={{ display: "inline-flex", marginRight: "1rem" }}
            />
            Join us on Discord!
          </a>
        </Box>

        <FooterSection
          Link={Link}
          extraStyle={{ alignSelf: "flex-end" }}
          header={"Legal"}
          links={[
            ["/terms", "Terms of Service"],
            ["/privacy", "Privacy Policy"],
          ]}
        />
      </Box>

      <NewsletterSignup />

      <Box className="footer-copyright-row">
        <Box className="footer-section">
          Splitgraph Limited, Registered in England and Wales no. 11657324
          <br />
          <br />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span>Made with</span>
            <IconHeart
              size={"1rem"}
              color="muted"
              extraStyle={{
                display: "inline-flex",
                marginRight: "1ch",
                marginLeft: "1ch",
              }}
            />
            <span>in Cambridge</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
