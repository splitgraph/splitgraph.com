import { ThemeProvider } from 'theme-ui';

import {
  makeDefaultTheme,
  IconCheck,
  IconCheckCircle,
  IconChevronsDown,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronsup,
  IconEmail,
  IconKey,
} from '@';

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

export default {
  title: 'Icons',
};

export const checkIcon = () => (
  <ThemeProvider theme={defaultTheme}>
    <IconCheck />
  </ThemeProvider>
);
checkIcon.story = 'IconCheck';

export const checkCircleIcon = () => (
  <ThemeProvider theme={defaultTheme}>
    <IconCheckCircle />
  </ThemeProvider>
);
checkCircleIcon.story = 'IconCheckCircle';

export const emailIcon = () => (
  <ThemeProvider theme={defaultTheme}>
    <IconEmail />
  </ThemeProvider>
);
emailIcon.story = 'EmailIcon';

// emailIcon.story = {
//   name: 'IconEmail',
// };
