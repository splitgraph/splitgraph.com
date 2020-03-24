// @jsx jsx
// @ts-ignore
import { jsx, Box } from 'theme-ui';
import * as React from 'react';

// TODO Mostly a placeholder component atm

export interface ICardProps {
  sx?: any;
  children?: React.ReactNode;
}

export default ({ children, sx }: ICardProps) => {
  const cardSx = {
    ...sx,
  };

  return <Box sx={cardSx}>{children}</Box>;
};
