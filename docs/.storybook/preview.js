import { ThemeProvider as MUIThemeProvider } from "@material-ui/core";
import { ThemeProvider } from "emotion-theming";
// Two theme providers is a weird workaround for components that depend on the theme.palette.mode e.g. <PasswordInput>
// Apparently req'd to support the 'Docs' tab in Storybook. Something to do with Emotion 10 (storybook) and 11 (MUIv5)
// https://github.com/storybookjs/storybook/issues/10231#issuecomment-613394048, https://github.com/storybookjs/storybook/pull/13300
import CssBaseline from "@material-ui/core/CssBaseline";
import { muiTheme } from "@splitgraph/tdesign/src/themes/muiTheme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeProvider theme={muiTheme}>
        <Story />
      </ThemeProvider>
    </MUIThemeProvider>
  ),
];
