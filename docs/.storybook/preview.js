import { ThemeProvider as MUIThemeProvider } from "@material-ui/core";
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
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

export const decorators = [
  (Story) => (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Story />
    </MUIThemeProvider>
  ),
];
