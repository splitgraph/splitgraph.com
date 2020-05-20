import { Link } from "@splitgraph/design";

const LogoImage = ({ logoURL }) => (
  <Link ariaLabel="Homepage" variant="links.unstyled" href="/" as="/">
    <img
      src={logoURL}
      style={{ maxHeight: "2rem", margin: 4 }}
      alt="splitgraph logo"
    />
  </Link>
);

export default LogoImage;
