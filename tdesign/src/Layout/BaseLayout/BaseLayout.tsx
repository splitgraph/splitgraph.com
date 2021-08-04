import * as React from "react";
import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles";

import { Header, HeaderLeft, HeaderCenter, HeaderRight } from "../Header";
import { Logo } from "../Logo";
import type { ILogoProps } from "../Logo";

export interface BaseLayoutProps extends Omit<ILogoProps, "linkTo"> {
  children?: React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderCenter?: () => React.ReactNode;
  extraHeaderStyle?: SxProps<Theme>;
  extraStyle?: object;
  showHeader?: boolean;
  logoLinkTo?: ILogoProps["linkTo"];
}

const BaseLayout = ({
  children,
  renderHeaderCenter,
  renderHeaderRight,
  extraHeaderStyle = {},
  extraStyle = {},
  showHeader = true,
  brandmarkURL,
  onHoverBrandmarkURL,
  animateWordmarkOnHover,
  wordmarkURL,
  logoText,
  brandName,
  logoLinkTo = "/",
}: BaseLayoutProps) => {
  const containerStyle: SxProps<Theme> = {
    // TODO: Deprecated variant syntax only works with legacyTheme
    // ".logo-link": { variant: "links.unstyled", },
    ".button-link": {
      backgroundColor: "primary.main",
      color: "muted.main",
      px: "0.3rem",
      py: "0.2rem",
      fontWeight: "bold",
      borderRadius: "0.5em",
      transition: "background-color .5s",
      ":hover": {
        cursor: "pointer",
        color: "white",
        border: 0,
        backgroundColor: "#437eab",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "200% 100%",
        transition: "background-size 1s, background-color 1s",
      },
      display: "inline-table",
    },

    // TODO: Deprecated variant syntax only works with legacyTheme
    // ".logo-link": {
    //   variant: "links.unstyled",
    // },
    // ".button-link-secondary": {
    //   variant: "links.buttonSecondary",
    //   display: "inline-table",
    // },
    // weird hack needs two class names to refer to same element...
    ".logo-link-flex": {
      display: "flex",
      alignItems: "center",
    },
    ".header--container": {
      ...extraHeaderStyle,
    },
    ".logo-text": {
      fontSize: "22pt",
      color: "initial",
    },
    ".logo-text:hover": {
      color: "initial",
    },
    ...extraStyle,
  };

  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box sx={containerStyle}>
      {showHeader && (
        <Header>
          <HeaderLeft>
            <Logo
              linkTo={logoLinkTo}
              brandmarkURL={brandmarkURL}
              onHoverBrandmarkURL={onHoverBrandmarkURL}
              animateWordmarkOnHover={animateWordmarkOnHover}
              wordmarkURL={wordmarkURL}
              brandName={brandName}
              logoText={logoText}
            />
          </HeaderLeft>
          <HeaderCenter>{headerCenter}</HeaderCenter>
          <HeaderRight>{headerRight}</HeaderRight>
        </Header>
      )}
      {children}
    </Box>
  );
};

export default BaseLayout;
