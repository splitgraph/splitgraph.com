import { ThemeProvider } from "@material-ui/core";
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
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];
