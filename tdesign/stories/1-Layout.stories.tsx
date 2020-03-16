import React from 'react';

import { ThemeProvider } from 'theme-ui';

import {
  BaseLayout,
  TwoColumnLayout,
  TwoColumnLayoutMain,
  TwoColumnLayoutLeft,
  makeDefaultTheme,
} from '@';

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

export default {
  title: 'Layout Stories',
};

export const baseLayoutStory = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BaseLayout>
        <p>Something</p>
      </BaseLayout>
    </ThemeProvider>
  );
};

baseLayoutStory.story = {
  name: 'Base Layout',
};

export const twoColumnLayoutStory = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TwoColumnLayout>
        <TwoColumnLayoutLeft>Left</TwoColumnLayoutLeft>
        <TwoColumnLayoutMain>Main</TwoColumnLayoutMain>
      </TwoColumnLayout>
    </ThemeProvider>
  );
};

twoColumnLayoutStory.story = {
  name: 'TwoColumnLayout',
};
