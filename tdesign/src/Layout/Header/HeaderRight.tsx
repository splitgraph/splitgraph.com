// @jsx jsx
// @ts-ignore
import { jsx, Box } from 'theme-ui';
import * as React from 'react';

export interface IHeaderRightProps {
  children?: React.ReactNode;
}

export default ({ children }: IHeaderRightProps) => {
  return <Box className="header--right">{children}</Box>;
};
