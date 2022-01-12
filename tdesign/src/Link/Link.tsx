import * as React from "react";
import Link from "next/link";
import { Box } from "@mui/material";

export interface INextDynamicLinkProps {
  pathname: string;
  query?: { [key: string]: string };
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
  extraStyle?: any;
  children: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
  rel?: "nofollow" | string;
}

const SplitgraphLink = React.forwardRef(
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
      <Box
        component="a"
        sx={{ variant, ...sx, ...extraStyle }}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    </Link>
  )
);
export default SplitgraphLink;
