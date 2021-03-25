/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import Link, { LinkProps } from "./Link";

const MutedLink = ({ children, href, ...rest }: LinkProps) => (
  <Link variant="links.muted" href={href} {...rest}>
    {children}
  </Link>
);

export default MutedLink;
