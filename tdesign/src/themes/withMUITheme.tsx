import {
  getDisplayName,
  NextComponentType,
} from "next/dist/next-server/lib/utils";

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

import UserTheme from "./UserTheme";

// If multiple instances of Emotion + caching becomes a problem again, see:
// https://github.com/emotion-js/emotion/issues/2210#issuecomment-758577800

const withMUITheme = <PageContext extends {}, IP extends {}, Props extends {}>(
  Page: NextComponentType<PageContext, IP, Props>
) => {
  const WithMUITheme: NextComponentType<PageContext, IP, Props> = (props) => {
    return (
      <UserTheme>
        {/* NOTE: Props are not modified in any way - we can safely ignore
          type-checking error here */}
        <Page {...(props as any)} />
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
