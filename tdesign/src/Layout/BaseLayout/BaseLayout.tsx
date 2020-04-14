// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

import { Header, HeaderLeft, HeaderCenter, HeaderRight } from '../Header';
import { LogoImage } from '../LogoImage';
import { LogoText } from '../LogoText';
import { Link } from '../../Link';

export interface BaseLayoutProps {
  children?: React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderCenter?: () => React.ReactNode;
}

const headerStyle = {
  minWidth: '-webkit-fit-content',
  '.logo-link': {
    variant: 'links.unstyled',
  },
} as SystemStyleObject;

export default ({
  children,
  renderHeaderCenter,
  renderHeaderRight,
}: BaseLayoutProps) => {
  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box sx={headerStyle}>
      <Header>
        <HeaderLeft>
          <Link className="logo-link" as={'/'} href={'/'}>
            <LogoImage />
            <LogoText />
          </Link>
        </HeaderLeft>
        <HeaderCenter>{headerCenter}</HeaderCenter>
        <HeaderRight>{headerRight}</HeaderRight>
      </Header>
      {children}
    </Box>
  );
};
