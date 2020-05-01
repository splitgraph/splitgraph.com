import Link from "./Link";

export default ({ children, ...rest }) => (
  <Link variant="links.muted" {...rest}>
    {children}
  </Link>
);
