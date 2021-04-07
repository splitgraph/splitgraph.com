/** @jsxImportSource theme-ui */

import { makeDefaultTheme } from "./defaultTheme";
import { ThemeUIStyleObject } from "theme-ui";

const defaultTheme = makeDefaultTheme();

export const mdxComponents = {
  pre: ({ children, ...rest }) => (
    <pre sx={defaultTheme.styles.pre as ThemeUIStyleObject} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.code} {...rest}>
      {children}
    </code>
  ),
  inlineCode: ({ children, ...rest }) => (
    <code sx={defaultTheme.styles.inlineCode as ThemeUIStyleObject} {...rest}>
      {children}
    </code>
  ),
};
export default mdxComponents;
