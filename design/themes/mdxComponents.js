// @jsx jsx
import { jsx } from "theme-ui";

import defaultTheme from "./defaultTheme";

export const mdxComponents = {
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
export default mdxComponents;
