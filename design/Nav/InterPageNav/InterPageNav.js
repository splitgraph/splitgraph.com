import { Box, Flex } from "../../index";

const NavLink = ({ title, url, Link }) => {
  return (
    <Box>
      {url ? (
        <Link href={url} title={title}>
          {title}
        </Link>
      ) : (
        <span>{title}</span>
      )}
    </Box>
  );
};

const LeftNav = ({ node, ...rest }) => {
  return <NavLink {...node} {...rest} />;
};

const UpNav = ({ node, ...rest }) => {
  return <NavLink {...node} {...rest} />;
};

const RightNav = ({ node, ...rest }) => {
  return <NavLink {...node} {...rest} />;
};

const InterPageNav = ({ Link, up, right, left }) => {
  const style = {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
    paddingTop: "8rem",
    marginTop: "8rem",
    borderTopColor: "#efefef",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    a: {
      color: "primary"
    }
  };

  return (
    <Flex sx={style}>
      <LeftNav node={left} Link={Link} />
      <UpNav node={up} Link={Link} />
      <RightNav node={right} Link={Link} />
    </Flex>
  );
};

export default InterPageNav;
