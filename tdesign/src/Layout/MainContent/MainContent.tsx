// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IMainContentProps {
  children: React.ReactNode;
}

const outerContainerStyle = {
  backgroundColor: 'gray',
  minHeight: '100vh',
} as SystemStyleObject;

const mainContentStyle = {} as SystemStyleObject;

export default ({ children }: IMainContentProps) => {
  return (
    <Box sx={outerContainerStyle}>
      <Box sx={mainContentStyle}>{children}</Box>
    </Box>
  );
};
