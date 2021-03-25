/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

import { Header, HeaderLeft, HeaderCenter, HeaderRight } from "../Header";
import { LogoImage } from "../LogoImage";
import { LogoText } from "../LogoText";

export interface BaseLayoutProps {
  children?: React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderCenter?: () => React.ReactNode;
  extraHeaderStyle?: SystemStyleObject;
  extraStyle?: SystemStyleObject;
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
  logoText = "Splitgraph",
}: BaseLayoutProps) => {
  const containerStyle = {
    // maxWidth: '100vw',
    minWidth: "-webkit-fit-content",
    // width: '100vw',
    ".logo-link": {
      variant: "links.unstyled",
    },
    ".button-link": {
      variant: "links.button",
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
    ...extraStyle,
  } as SystemStyleObject;

  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box sx={containerStyle}>
      {showHeader && (
        <Header>
          <HeaderLeft>
            <a
              className="logo-link logo-link-flex"
              aria-label="home"
              href={"/"}
            >
              <LogoImage
                logoURL={"/static/splitgraph_logo_light_nocircle.svg"}
              />
              <LogoText text={logoText} />
            </a>
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
