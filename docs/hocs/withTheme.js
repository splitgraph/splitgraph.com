import { getDisplayName } from "next/dist/next-server/lib/utils";

// This is kinda hacky atm, and should be a more unified export from tcomponents
import { ThemeProvider as OurThemeProvider } from "theme-ui";
import { ThemeProvider, makeDefaultTheme } from "@splitgraph/tdesign";

const defaultTheme = !!makeDefaultTheme ? makeDefaultTheme() : {};

const withTheme = (Page) => {
  const WithTheme = (props) => (
    <OurThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Page {...props} />
      </ThemeProvider>
    </OurThemeProvider>
  );

  if (Page.getInitialProps) {
    WithTheme.getInitialProps = Page.getInitialProps.bind(Page);
  }

  WithTheme.displayName = `WithTheme(${getDisplayName(Page)})`;
  return WithTheme;
};

export default withTheme;
