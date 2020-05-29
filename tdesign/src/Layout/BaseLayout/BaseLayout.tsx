// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

import { Header, HeaderLeft, HeaderCenter, HeaderRight } from '../Header';
import { LogoImage } from '../LogoImage';
import { LogoText } from '../LogoText';

export interface BaseLayoutProps {
  children?: React.ReactNode;
  renderHeaderRight?: () => React.ReactNode;
  renderHeaderCenter?: () => React.ReactNode;
  extraHeaderStyle?: SystemStyleObject;
  extraStyle?: SystemStyleObject;
}

export default ({
  children,
  renderHeaderCenter,
  renderHeaderRight,
  extraHeaderStyle = {},
  extraStyle = {},
}: BaseLayoutProps) => {
  const containerStyle = {
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
    ...extraStyle,
  } as SystemStyleObject;

  const headerCenter = !!renderHeaderCenter ? renderHeaderCenter() : null;
  const headerRight = !!renderHeaderRight ? renderHeaderRight() : null;

  return (
    <Box sx={containerStyle}>
      <Header>
        <HeaderLeft>
          <a className="logo-link logo-link-flex" aria-label="home" href={'/'}>
            <LogoImage logoURL={'/static/splitgraph_logo_light_nocircle.svg'} />
            <LogoText />
          </a>
        </HeaderLeft>
        <HeaderCenter>{headerCenter}</HeaderCenter>
        <HeaderRight>{headerRight}</HeaderRight>
      </Header>
      {children}
    </Box>
  );
};
