// @jsx jsx
import { Styled } from 'theme-ui';
import * as React from 'react';
import Link from 'next/link';

export interface LinkProps
  extends React.HTMLAttributes<
    HTMLAnchorElement | HTMLButtonElement | HTMLElement
  > {
  href: string;
  as?: string;
  replace?: boolean;
  variant?: string;
  sx?: any;
  children: React.ReactNode;
}

export default React.forwardRef(
  (
    {
      href,
      as,
      replace,
      variant = 'links.primary',
      sx = {},
      children,
      ...rest
    }: LinkProps,
    ref: any
  ) => (
    <Link href={href} as={as} passHref>
      <Styled.a sx={{ variant, ...sx }} ref={ref} {...rest}>
        {children}
      </Styled.a>
    </Link>
  )
);
