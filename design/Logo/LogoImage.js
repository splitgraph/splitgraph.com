const LogoImage = ({ logoURL }) => (
  <a aria-label="Homepage" variant="links.unstyled" href="/">
    <img
      src={logoURL}
      style={{ maxHeight: "2rem", margin: 4 }}
      alt="splitgraph logo"
    />
  </a>
);

export default LogoImage;
