import { Box } from "@splitgraph/design";

const SidebarNode = ({
  Link,
  minLabelDepth,
  sidebar: { depth, url, slug, metadata: { title } = {}, children }
}) => {
  // const outerStyle = {
  //   margin: 5 * depth
  // };
  const outerStyle = {};

  const item = (
    <>
      {url ? (
        <Link href={url}>
          <a>{title}</a>
        </Link>
      ) : depth >= minLabelDepth ? (
        <span>{title}</span>
      ) : null}
      {children && (
        <div className="ul-wrapper" style={outerStyle}>
          <ul key={`${slug}`}>
            {children.map(child => (
              <SidebarNode
                key={`${child.slug}`}
                Link={Link}
                sidebar={child}
                minLabelDepth={minLabelDepth}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return depth < minLabelDepth ? item : <li>{item}</li>;
};

const Sidebar = ({ sidebar, Link, minLabelDepth = 0 }) => {
  return (
    <>
      {!minLabelDepth &&
        sidebar &&
        sidebar.metadata &&
        sidebar.metadata.title && <h1>{sidebar.metadata.title}</h1>}
      <ul>
        <SidebarNode
          Link={Link}
          sidebar={sidebar}
          minLabelDepth={minLabelDepth}
        />
      </ul>
    </>
  );
};

export default ({
  children,
  gridArea = "nav",
  sidebar = {},
  Link,
  minLabelDepth = 1,
  maxVisibleDepth = 2
}) => (
  <Box
    sx={{
      gridArea,
      position: "relative",
      left: 0,
      right: 0,
      "@media (max-width: 768px)": {
        marginTop: "-2rem"
      },
      ul: {
        listStyleType: "none",
        padding: 0,
        "@media (max-width: 768px)": {
          display: "inline-flex",
          flexWrap: "nowrap"
        }
      },
      ".ul-wrapper": {
        display: "inline-flex",
        "@media (max-width: 768px)": {
          flexWrap: "wrap",
          marginTop: "1rem",
          left: 0,
          right: 0,
          position: "absolute",
          flexFlow: "initial",
          flexBasis: "100%",
          padding: 0,
          backgroundColor: "green",
          overflowX: "scroll",
          paddingBottom: "1rem"
        }
      },
      li: {
        "@media (max-width: 768px)": {
          whiteSpace: "nowrap"
        }
      },
      li: {
        "@media (min-width: 769px)": {
          display: "flex",
          flexDirection: "column"
        }
      },
      span: {
        "@media (min-width: 769px)": {
          display: "block",
          flexBasis: "100%"
        }
      }
    }}
    fontSize={2}
  >
    {children}
    <Sidebar sidebar={sidebar} Link={Link} minLabelDepth={minLabelDepth} />
  </Box>
);
