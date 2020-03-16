// @jsx jsx
import * as React from 'react';

export interface LinkProps
  extends React.HTMLAttributes<
    HTMLAnchorElement | HTMLButtonElement | HTMLElement
  > {
  href?: string;
  as?: string;
  replace?: boolean;
  variant?: string;
  sx?: any;
  children: React.ReactNode;
}

// TODO: Figure out best way to inject next/link
export default ({
  href,
  as,
  replace,
  variant = 'links.primary',
  sx = {},
  children,
  ...rest
}: LinkProps) => (
  <a style={{ variant, ...sx }} href={href} {...rest}>
    {children}
  </a>
);
