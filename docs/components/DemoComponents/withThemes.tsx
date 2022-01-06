import { getDisplayName } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "@emotion/react";

export interface MyTheme {
  myColor: string;
  myCoolColor: string;
}
const theme: MyTheme = {
  myColor: "red",
  myCoolColor: "blue",
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
