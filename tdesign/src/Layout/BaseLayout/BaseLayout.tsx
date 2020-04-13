// @jsx jsx
import * as React from 'react';

import { Box } from 'rebass';
import { Header, HeaderLeft, HeaderCenter, HeaderRight } from '../Header';
import { LogoImage } from '../LogoImage';
import { LogoText } from '../LogoText';

export interface BaseLayoutProps {
  children?: React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderCenter?: () => React.ReactNode;
}

export default ({
  children,
  renderHeaderCenter,
  renderHeaderRight,
}: BaseLayoutProps) => {
  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box style={{ minWidth: '-webkit-fit-content' }}>
      <Header>
        <HeaderLeft>
          <LogoImage />
          <LogoText />
        </HeaderLeft>
        <HeaderCenter>{headerCenter}</HeaderCenter>
        <HeaderRight>{headerRight}</HeaderRight>
      </Header>
      {children}
    </Box>
  );
};
