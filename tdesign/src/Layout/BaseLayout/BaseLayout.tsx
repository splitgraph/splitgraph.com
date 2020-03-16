// @jsx jsx
import * as React from 'react';

import { Box } from 'rebass';
import { Header } from '../Header';

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
      <Header>Header</Header>
      {children}
    </Box>
  );
};
