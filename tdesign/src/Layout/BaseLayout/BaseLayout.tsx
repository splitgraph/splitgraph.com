// @jsx jsx
import * as React from 'react';

import { Box } from 'rebass';
import { Header, HeaderLeft, HeaderCenter, HeaderRight } from '../Header';
import { LogoImage } from '../LogoImage';
import { LogoText } from '../LogoText';
import { Link } from '../../Link';
import { Avatar } from '../../Avatar';

// import "@csstools/normalize.css";
// import "../../css/base.css";

// import defaultTheme from "../../defaultTheme";

// import { ThemeProvider } from "theme-ui";

export interface BaseLayoutProps {
  children?: React.ReactNode;
}

export default ({ children }: BaseLayoutProps) => {
  return (
    <Box>
      <Header>
        <HeaderLeft>
          <LogoImage />
          <LogoText />
        </HeaderLeft>
        <HeaderCenter>Center</HeaderCenter>
        <HeaderRight>
          <Link href="#">Docs</Link>
          <Avatar initials={'MR'} />
        </HeaderRight>
      </Header>
      {children}
    </Box>
  );
};
