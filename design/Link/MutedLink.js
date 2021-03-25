import Link from "./Link";

const MutedLink = ({ children, ...rest }) => <Link variant="links.muted" {...rest}>
  {children}
</Link>;

export default MutedLink;
