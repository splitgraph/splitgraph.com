const BaseStyle = {
  Container: {
    position: "relative",
    left: 0,
    right: 0,
  },
  ListContainer: {
    display: "inline-flex",
  },
  List: {
    listStyleType: "none",
    padding: 0,
  },
  Item: {
    color: "primary.main",
  },
  Label: {},
};

const HorizontalStyle = {
  Container: {
    backgroundColor: "background",
    padding: 0,
  },
  ListContainer: {
    flexWrap: "wrap",
    marginTop: "4rem",
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",

    flexFlow: "initial",
    flexBasis: "100%",
    padding: 0,

    borderTopWidth: "0px",
    borderTopStyle: "dotted",
    borderTopColor: "legacySecondary.main",
    height: "4rem",
    backgroundColor: "background",
  },
  List: {
    display: "inline-flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    scrollbarWidth: "0",
    MsOverflowStyle: "none",
    overflowY: "hidden",
    alignItems: "center",
    paddingLeft: 2,
    paddingRight: 4,
    scrollSnapType: "x mandatory",
    scrollPaddingRight: "200px",
    scrollPaddingLeft: "200px",
  },
  Item: {
    display: "flex",
    whiteSpace: "nowrap",
  },
  Label: {
    whiteSpace: "nowrap",
    zIndex: 10,
  },
};

const VerticalStyle = {
  Container: {
    display: "flex",
    width: "100%",
    backgroundColor: "background",
    alignItems: "center",
    justifyContent: "left",
    flexDirection: "column",
    lineSpacing: "4rem",

    // Container ltr + rtl = scrollbar on right (from ltr), align content to right (from rtl)
    direction: "ltr",
    overflowY: "auto",
    MsOverflowStyle: "-ms-autohiding-scrollbar",
    scrollbarWidth: "thin",
    paddingBottom: "8rem",
    scrollPaddingBottom: "200px",

    backgroundColor: "#efefef",
  },
  ListContainer: {
    direction: "rtl",
    // Required to work in safari
    display: "-webkit-box",
    flexBasis: "100%",
    backgroundColor: "#efefef",
  },
  List: {
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    backgroundColor: "background",
  },
  Item: {
    display: "flex",
    flexDirection: "column",
  },
  Label: {
    display: "block",
    flexBasis: "100%",
  },
};

const breakStyle = (
  key,
  styles = { BaseStyle, VerticalStyle, HorizontalStyle }
) => ({
  ...styles.BaseStyle[key],
  "@media (min-width: 769px)": {
    ...styles.VerticalStyle[key],
  },
  "@media (max-width: 768px)": {
    ...styles.HorizontalStyle[key],
  },
});

const Style = {
  Container: breakStyle("Container"),
  List: breakStyle("List"),
  ListContainer: breakStyle("ListContainer"),
  Item: breakStyle("Item"),
  Label: breakStyle("Label"),
};

export const getListStyle = ({ isInActivePath = false }) => {
  return breakStyle("List", {
    BaseStyle,
    HorizontalStyle,
    VerticalStyle: {
      ...VerticalStyle,
    },
  });
};

export const getListContainerStyle = ({
  hiddenHorizontally = false,
  hiddenVertically = false,
  depth = 0,
  minLabelDepth = 0,
}) => {
  return breakStyle("ListContainer", {
    BaseStyle,
    HorizontalStyle: {
      ...HorizontalStyle,
      ListContainer: {
        ...HorizontalStyle.ListContainer,
        ...(hiddenHorizontally
          ? { display: "none !important" }
          : { display: HorizontalStyle.ListContainer.display }),
        ...(depth < 1
          ? { marginTop: "0 !important" }
          : { marginTop: HorizontalStyle.ListContainer.marginTop }),
      },
    },
    VerticalStyle: {
      ...VerticalStyle,
      ListContainer: {
        ...VerticalStyle.ListContainer,
        ...(hiddenVertically
          ? { display: "none !important" }
          : {
              display: VerticalStyle.ListContainer.display,
            }),
      },
    },
  });
};

export default Style;
