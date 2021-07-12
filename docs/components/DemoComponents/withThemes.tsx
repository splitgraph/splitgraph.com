import { getDisplayName } from "next/dist/next-server/lib/utils";
import { ThemeProvider } from "@emotion/react";
import { theme as designTheme } from "@splitgraph/tdesign";

export interface MyTheme {
  myColor: string;
  myCoolColor: string;
}
const theme: MyTheme = {
  myColor: "red",
  myCoolColor: designTheme.primary.main,
};

const withThemes = (Page) => {
  const WithTheme = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <Page {...props} />
      </ThemeProvider>
    );
  };

  if (Page.getInitialProps) {
    WithTheme.getInitialProps = Page.getInitialProps.bind(Page);
  }

  WithTheme.displayName = `WithThemes(${getDisplayName(Page)})`;
  return WithTheme;
};

export default withThemes;
