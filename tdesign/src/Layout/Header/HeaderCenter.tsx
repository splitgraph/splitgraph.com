// @jsx jsx
// @ts-ignore
import { jsx, Box } from 'theme-ui';
import * as React from 'react';

export interface IHeaderCenterProps {
  children?: React.ReactNode;
}

export default ({ children }: IHeaderCenterProps) => {
  return <Box className="header--center">{children}</Box>;
};
