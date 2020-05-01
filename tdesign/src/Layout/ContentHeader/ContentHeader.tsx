// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IContentHeaderProps {
  children?: React.ReactNode;
}

const headerContainerStyle = {
  marginBottom: '2rem',
  color: 'primary',
  '.content-header--banner': {
    padding: '0.5em',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    h2: {
      display: 'inline',
      margin: 0,
    },
  },
} as SystemStyleObject;

export default ({ children }: IContentHeaderProps) => {
  return (
    <Box sx={headerContainerStyle}>
      <Box className="content-header--banner">{children}</Box>
    </Box>
  );
};
