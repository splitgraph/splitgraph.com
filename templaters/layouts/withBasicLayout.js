// @jsx jsx
import { jsx } from "theme-ui";
import React, { useMemo } from "react";

import { BaseLayout } from "@splitgraph/design/Layout";
import { defaultTheme } from "@splitgraph/design";

const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <pre sx={defaultTheme.styles.pre} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.code} {...rest}>
      {children}
    </code>
  ),
  inlineCode: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.inlineCode} {...rest}>
      {children}
    </code>
  ),
};

// TODO: Move this back into the docs repository (?) so no need to do this dumb
// dependency injection. It was only put into its own so that autogenned scripts
// could reference it by name instead of relative path, but that's fixed now.
const withBlogLayout = ({ MdxPage, meta = {}, contentTree, Link }) => {
  // Because we rewrite URLs, when using next/link, we need to specify
  // the mapping so next.js loads the right script. If we do not do this,
  // client side routing does not work and we get "content flashes"
  const ContentLink = ({ href, children, ...rest }) => {
    return (
      <Link href={`/_content${href}`} as={href} passHref>
        <a
          {...rest}
          sx={defaultTheme.links.primary}
          onClick={(e) => {
            console.log("clicked");
          }}
        >
          {children}
        </a>
      </Link>
    );
  };

  mdxComponents.a = ContentLink;

  const WithBlogLayout = ({ router }) => {
    return (
      <BaseLayout>
        <MdxPage components={mdxComponents} />
      </BaseLayout>
    );
  };

  WithBlogLayout.displayName = `WithBlogLayout`;

  return WithBlogLayout;
};

export default withBlogLayout;
