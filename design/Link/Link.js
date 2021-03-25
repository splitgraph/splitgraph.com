/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import NextLink from "next/link";

import { Text } from "rebass";

const Link = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  variant = "links.primary",
  sx = {},
  children,
  ...rest
}) => (
  <NextLink
    href={href}
    as={href}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
    passHref
  >
    <a sx={{ variant, ...sx }} {...rest}>
      {children}
    </a>
  </NextLink>
);

export default Link;
