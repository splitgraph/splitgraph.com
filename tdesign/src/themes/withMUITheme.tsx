import { getDisplayName } from "next/dist/next-server/lib/utils";
import CssBaseline from "@material-ui/core/CssBaseline";

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

import { ThemeProvider } from "@material-ui/core/styles";

import { muiTheme } from "./muiTheme";

// If multiple instances of Emotion + caching becomes a problem again, see:
// https://github.com/emotion-js/emotion/issues/2210#issuecomment-758577800

const withMUITheme = (Page) => {
  const WithMUITheme = (props) => {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Page {...props} />
      </ThemeProvider>
    );
  };

  if (Page.getInitialProps) {
    WithMUITheme.getInitialProps = Page.getInitialProps.bind(Page);
  }

  WithMUITheme.displayName = `WithMUITheme(${getDisplayName(Page)})`;
  return WithMUITheme;
};

export default withMUITheme;
