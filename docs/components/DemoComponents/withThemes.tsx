import { getDisplayName } from "next/dist/next-server/lib/utils";
import { ThemeProvider } from "@emotion/react";
import { muiTheme } from "@splitgraph/tdesign";
import { Theme } from "@material-ui/core/styles";

export interface MyTheme extends Theme {
  myColor: string;
}
const theme: MyTheme = { ...muiTheme, myColor: "red" };

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
