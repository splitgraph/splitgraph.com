// @jsx jsx
import * as React from 'react';

import { Box } from 'rebass';

export interface HeaderProps {
  children?: React.ReactNode;
  gridArea?: string;
}

const headerSx: any = {
  backgroundColor: 'primary',
  display: 'flex',
  minHeight: 100,
  maxHeight: 100,
};

export default ({ children, gridArea = 'header' }: HeaderProps) => (
  <Box sx={{ gridArea, ...headerSx }}>{children}</Box>
);
