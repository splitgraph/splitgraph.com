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
  extraHeaderStyle?: SystemStyleObject;
}

export default ({
  children,
  renderHeaderCenter,
  renderHeaderRight,
  extraHeaderStyle = {},
}: BaseLayoutProps) => {
  const headerStyle = {
    // maxWidth: '100vw',
    minWidth: '-webkit-fit-content',
    // width: '100vw',
    '.logo-link': {
      variant: 'links.unstyled',
    },
    '.button-link': {
      variant: 'links.button',
      display: 'inline-table',
    },
    // weird hack needs two class names to refer to same element...
    '.logo-link-flex': {
      display: 'flex',
      alignItems: 'center',
    },
    '.header--container': {
      ...extraHeaderStyle,
    },
  } as SystemStyleObject;

  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box sx={headerStyle}>
      <Header>
        <HeaderLeft>
          <Link className="logo-link logo-link-flex" as={'/'} href={'/'}>
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
