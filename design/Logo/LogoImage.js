import { Link } from "@splitgraph/design";

const LogoImage = ({ logoURL }) => (
  <Link variant="links.unstyled" href="/" as="/">
    <img src={logoURL} style={{ maxHeight: "2rem", margin: 4 }} />
  </Link>
);

export default LogoImage;
