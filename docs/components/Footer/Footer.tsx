// @jsx jsx
// @ts-ignore
import { Box, SystemStyleObject, jsx } from "theme-ui";
import * as React from "react";

import FooterSection from "./FooterSection";

import Octicon from "@splitgraph/design/Icon/ThirdParty/GitHub/Octicon";

import {
  IconLogoTwitter,
  IconLogoLinkedIn,
  IconLogoReddit,
  IconHeart,
} from "@splitgraph/tdesign";

export interface IFooterProps {
  extraStyle?: SystemStyleObject;
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
};

const mixStyles = (
  property: string,
  ...styles: SystemStyleObject[]
): SystemStyleObject => {
  return styles.reduce(
    (mix, style) => ({
      ...mix,
      ...(style.hasOwnProperty(property) ? style[property] : {}),
    }),
    {}
  );
};

const Footer = ({ footerVariant = "dark", extraStyle = {} }: IFooterProps) => {
  // only one footer variant for now
  const baseVariant = footerVariant === "dark" ? darkVariant : darkVariant;

  return (
    <footer
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
          marginBottom: ["2rem", "inherit", "inherit"],
          ...mixStyles(".community-logos", baseVariant, extraStyle),
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
          header={"Product"}
          links={[
            ["/", "Home"],
            ["/explore", "Explore Data"],
            ["/product/splitgraph/use-cases", "Use Cases"],
            ["/product/splitgraph/integrations", "Integrations"],
          ]}
        />

        <FooterSection
          header={"Support"}
          links={[
            ["/docs", "Documentation"],
            ["/docs/getting-started/frequently-asked-questions", "FAQ"],
            [
              "https://github.com/splitgraph/splitgraph/tree/master/examples",
              "Examples",
            ],
          ]}
        />

        <FooterSection
          header={"Company"}
          links={[
            ["/blog", "Blog"],
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
              <Octicon />
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
          </Box>
        </Box>

        <FooterSection
          extraStyle={{ alignSelf: "flex-end" }}
          header={"Legal"}
          links={[
            ["/terms", "Terms of Service"],
            ["/privacy", "Privacy Policy"],
          ]}
        />
      </Box>

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
    </footer>
  );
};

export default Footer;
