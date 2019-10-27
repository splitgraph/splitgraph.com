import { Box } from "@splitgraph/design";
import { useState } from "react";

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

const BaseStyle = {
  Container: {},
  ListContainer: {
    display: "inline-flex"
  },
  List: {
    listStyleType: "none",
    padding: 0
  },
  Item: {
    whiteSpace: "nowrap"
  },
  Label: {}
};

const HorizontalStyle = {
  Container: {},
  ListContainer: {
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
  },
  List: {
    display: "inline-flex",
    flexWrap: "nowrap"
  },
  Item: {
    display: "flex",
    whiteSpace: "nowrap"
  },
  Label: {
    whiteSpace: "nowrap"
  }
};

const VerticalStyle = {
  Container: {},
  ListContainer: {},
  List: {},
  Item: {
    display: "flex",
    flexDirection: "column"
  },
  Label: {
    display: "block",
    flexBasis: "100%"
  }
};

const Style = {
  Container: {
    ...BaseStyle.Container,
    "@media (min-width: 769px)": {
      ...VerticalStyle.Container
    },
    "@media (max-width: 768px)": {
      ...HorizontalStyle.Container
    }
  },
  List: {
    ...BaseStyle.List,
    "@media (min-width: 769px)": {
      ...VerticalStyle.List
    },
    "@media (max-width: 768px)": {
      ...HorizontalStyle.List
    }
  },
  ListContainer: {
    ...BaseStyle.ListContainer,
    "@media (min-width: 769px)": {
      ...VerticalStyle.ListContainer
    },
    "@media (max-width: 768px)": {
      ...HorizontalStyle.ListContainer
    }
  },
  ListItem: {
    ...BaseStyle.ListItem,
    "@media (min-width: 769px)": {
      ...VerticalStyle.ListItem
    },
    "@media (max-width: 768px)": {
      ...HorizontalStyle.ListItem
    }
  },
  Label: {
    ...BaseStyle.Label,
    "@media (min-width: 769px)": {
      ...VerticalStyle.Label
    },
    "@media (max-width: 768px)": {
      ...HorizontalStyle.Label
    }
  }
};

export default ({
  children,
  gridArea = "nav",
  sidebar = {},
  Link,
  minLabelDepth = 1,
  maxVisibleDepth = 2,
  activeId = null
}) => {
  return (
    <Box
      sx={{
        gridArea,
        ...Style.Container,
        position: "relative",
        left: 0,
        right: 0,
        "@media (max-width: 768px)": {
          marginTop: "-2rem"
        },
        ul: Style.List,
        ".ul-wrapper": Style.ListContainer,
        li: Style.ListItem,
        "span,a": Style.Label
      }}
      fontSize={2}
    >
      {children}
      <Sidebar
        sidebar={sidebar}
        Link={Link}
        minLabelDepth={minLabelDepth}
        activeId={activeId}
      />
    </Box>
  );
};
