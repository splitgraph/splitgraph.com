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
    // backgroundColor: "green",
    // paddingBottom: "1rem",
    // overflowY: "hidden",
    height: "1rem"
  },
  List: {
    display: "inline-flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    scrollbarWidth: "0",
    MsOverflowStyle: "none",
    overflowY: "hidden"
    // paddingBottom: "2rem"
  },
  Item: {
    display: "flex",
    whiteSpace: "nowrap"
  },
  Label: {
    whiteSpace: "nowrap",
    zIndex: 10
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

const breakStyle = (
  key,
  styles = { BaseStyle, VerticalStyle, HorizontalStyle }
) => ({
  ...styles.BaseStyle[key],
  "@media (min-width: 769px)": {
    ...styles.VerticalStyle[key]
  },
  "@media (max-width: 768px)": {
    ...styles.HorizontalStyle[key]
  }
});

const Style = {
  Container: breakStyle("Container"),
  List: breakStyle("List"),
  ListContainer: breakStyle("ListContainer"),
  ListItem: breakStyle("ListItem"),
  Label: breakStyle("Label")
};

export const getListContainerStyle = ({
  hiddenHorizontally = false,
  hiddenVertically = false
}) => {
  return breakStyle("ListContainer", {
    BaseStyle,
    HorizontalStyle: {
      ...HorizontalStyle,
      ListContainer: {
        ...HorizontalStyle.ListContainer,
        ...(hiddenHorizontally
          ? { display: "none !important" }
          : { display: HorizontalStyle.ListContainer.display })
      }
    },
    VerticalStyle: {
      ...VerticalStyle,
      ListContainer: {
        ...VerticalStyle.ListContainer,
        ...(hiddenVertically
          ? { display: "none !important" }
          : { display: VerticalStyle.ListContainer.display })
      }
    }
  });
};

export default Style;
