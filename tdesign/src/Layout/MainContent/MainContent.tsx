// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IMainContentProps {
  children: React.ReactNode;
}

const mainContentStyle = {} as SystemStyleObject;

export default ({ children }: IMainContentProps) => {
  const outerContainerStyle = {
    backgroundColor: 'gray',
    minHeight: '100vh',
    fontFamily: '"Cambria", sans-serif',
    // maxWidth: '100vw',
    // minWidth: '100vw',
    // width: '100vw',
    // maxWidth: '100vw',
  } as SystemStyleObject;

  return (
    <Box sx={outerContainerStyle}>
      <Box sx={mainContentStyle}>{children}</Box>
    </Box>
  );
};
