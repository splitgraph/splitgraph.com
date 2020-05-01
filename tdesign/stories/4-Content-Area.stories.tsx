import React from 'react';

import { ThemeProvider } from 'theme-ui';

import { BaseLayout, MainContent, makeDefaultTheme } from '@';

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

export default {
  title: 'Content Area',
};

export const basicContentArea = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BaseLayout>
        <MainContent>Main</MainContent>
      </BaseLayout>
    </ThemeProvider>
  );
};

basicContentArea.story = {
  name: 'MainContent',
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};
