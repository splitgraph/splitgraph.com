// @jsx jsx
import { Styled, SystemStyleObject } from "theme-ui";
import * as React from "react";
import Link from "next/link";

export interface INextDynamicLinkProps {
  pathname: string;
  query: { [key: string]: string };
}

export interface LinkProps
  extends React.HTMLAttributes<
    HTMLAnchorElement | HTMLButtonElement | HTMLElement
  > {
  href: string | INextDynamicLinkProps;
  as?: string | INextDynamicLinkProps;
  replace?: boolean;
  variant?: string;

  // note: sx is deprecated, but keep around in case anything (wrongly) using it
  sx?: any;
  extraStyle?: SystemStyleObject;
  children: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
}

export default React.forwardRef(
  (
    {
      href,
      as,
      replace,
      variant = "links.primary",
      sx = {},
      extraStyle = {},
      children,
      ...rest
    }: LinkProps,
    ref: any
  ) => (
    <Link href={href} as={as} passHref>
      <Styled.a sx={{ variant, ...sx, ...extraStyle }} ref={ref} {...rest}>
        {children}
      </Styled.a>
    </Link>
  )
);
