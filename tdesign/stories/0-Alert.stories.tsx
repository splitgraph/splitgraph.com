import { ThemeProvider } from 'theme-ui';

import { ErrorAlert, SuccessAlert, makeDefaultTheme } from '@';

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

export default {
  title: 'Alerts',
};

export const errorAlertStory = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ErrorAlert message="Oh no, you died 😨" />
    </ThemeProvider>
  );
};

errorAlertStory.story = {
  name: 'Error Alert',
};

export const successAlertStory = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SuccessAlert message="Oh yay, you did it! 😁" />
    </ThemeProvider>
  );
};

successAlertStory.story = {
  name: 'Success Alert',
};
