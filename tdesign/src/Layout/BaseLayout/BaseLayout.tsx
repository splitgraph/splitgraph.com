import * as React from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import {
  Header,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  MobileHeader,
} from "../Header";
import { LogoImage } from "../LogoImage";
import { LogoText } from "../LogoText";

export interface BaseLayoutProps {
  children?: React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderCenter?: () => React.ReactNode;
  extraHeaderStyle?: object;
  extraStyle?: object;
  showHeader?: boolean;
  logoText?: string;
}

const BaseLayout = ({
  children,
  renderHeaderCenter,
  renderHeaderRight,
  extraHeaderStyle = {},
  extraStyle = {},
  showHeader = true,
  logoText,
}: BaseLayoutProps) => {
  const containerStyle = {
    // maxWidth: '100vw',
    minWidth: "-webkit-fit-content",
    width: "100vw",
    ".logo-link": {
      variant: "links.unstyled",
    },
    ".button-link": {
      // from theme-ui's links.button
      backgroundColor: "primary.main",
      // backgroundColor: "secondary",
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
    ".button-link-secondary": {
      variant: "links.buttonSecondary",
      display: "inline-table",
    },
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box sx={containerStyle}>
      {showHeader && matches ? (
        <Header>
          <HeaderLeft>
            <a
              className="logo-link logo-link-flex"
              aria-label="home"
              href={"/"}
            >
              <LogoImage logoURL={"/static/brandmark.svg"} />
              <LogoText text={logoText} />
            </a>
          </HeaderLeft>
          <HeaderCenter>{headerCenter}</HeaderCenter>
          <HeaderRight>{headerRight}</HeaderRight>
        </Header>
      ) : (
        <MobileHeader
          logoText={logoText}
          searchInput={headerCenter as React.ReactElement}
        />
      )}
      {children}
    </Box>
  );
};

export default BaseLayout;
