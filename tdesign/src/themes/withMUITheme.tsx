import { getDisplayName } from "next/dist/next-server/lib/utils";

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

import UserTheme from "./UserTheme";

// If multiple instances of Emotion + caching becomes a problem again, see:
// https://github.com/emotion-js/emotion/issues/2210#issuecomment-758577800

const withMUITheme = (Page) => {
  const WithMUITheme = (props) => {
    return (
      <UserTheme>
        <Page {...props} />
      </UserTheme>
    );
  };

  if (Page.getInitialProps) {
    WithMUITheme.getInitialProps = Page.getInitialProps.bind(Page);
  }

  WithMUITheme.displayName = `WithMUITheme(${getDisplayName(Page)})`;
  return WithMUITheme;
};

export default withMUITheme;
