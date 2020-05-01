// @jsx jsx
// @ts-ignore
import { jsx, Box } from 'theme-ui';
import * as React from 'react';

export interface IHeaderLeftProps {
  children?: React.ReactNode;
}

export default ({ children }: IHeaderLeftProps) => {
  return <Box className="header--left">{children}</Box>;
};
