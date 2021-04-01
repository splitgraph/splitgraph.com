/** @jsxImportSource theme-ui */

// import {
//   IconChevronLeftPrimaryColor,
//   IconChevronRightPrimaryColor,
// } from "@splitgraph/tdesign";

import { Box } from "theme-ui";

const linkBoxStyle = {
  padding: "1rem",
  borderRadius: "1rem",
  boxShadow: "0 0 4px rgba(0, 0, 0, .125)",
  margin: "1rem",
  display: "flex",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
    boxShadow: "0 0 4px rgba(0, 0, 0, .5)",
    textDecoration: "none",
  },
  ".link-text-container": {
    display: "flex",
    flexDirection: "column",
    ".link-meta": {
      textTransform: "uppercase",
      color: "primary",
      opacity: "0.5",
      fontSize: "x-small",
      marginTop: "1em",
      display: ["none", "initial", "initial"],
      ":hover": {
        textDecoration: "none",
      },
    },
  },
  ".link-text-container--right": {
    alignItems: "flex-end",
  },
};

const NavLink = ({ node, Link, children, justifyContent = "flex-start" }) => {
  return (
    <Box
      className="link-box"
      sx={{
        "> a": {
          ...linkBoxStyle,
          justifyContent,
        },
      }}
    >
      <Link href={node.url} title={node.title}>
        {children}
      </Link>
    </Box>
  );
};

const LeftNav = ({ node, Link, ...rest }) => {
  return node && node.url ? (
    <NavLink node={node} Link={Link} {...rest}>
      {/* <IconChevronLeftPrimaryColor size="3rem" /> */}
      <Box className="link-text-container link-text-container--left">
        <span className="link-anchor-text" title={node.title}>
          {node.title}
        </span>
        <span className="link-meta">Previous</span>
      </Box>
    </NavLink>
  ) : null;
};

const RightNav = ({ node, Link, ...rest }) => {
  return node && node.url ? (
    <NavLink justifyContent="flex-end" node={node} Link={Link} {...rest}>
      <Box className="link-text-container link-text-container--right">
        <span className="link-anchor-text" title={node.title}>
          {node.title}
        </span>
        <span className="link-meta">Next</span>
      </Box>
      {/* <IconChevronRightPrimaryColor size="3rem" /> */}
    </NavLink>
  ) : null;
};

const InterPageNav = ({ Link, up, right, left }) => {
  const style = {
    display: "flex",
    paddingTop: ["initial", "initial", "8rem"],
    paddingBottom: ["initial", "initial", "8rem"],
    borderTopColor: "#efefef",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    a: {
      color: "primary",
      textDecoration: "none",
    },
  };

  return (
    <Box sx={style}>
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          flexDirection: ["column", "column", "row-reverse"],
          ".link-box": {
            flexGrow: 0,
            flexShrink: 1,
            minWidth: ["100%", "100%", "50%"],
          },
        }}
      >
        <RightNav node={right} Link={Link} />
        <LeftNav node={left} Link={Link} />
      </Box>
    </Box>
  );
};

export default InterPageNav;
