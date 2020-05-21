// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

export interface IBoxSetProps {
  children?: React.ReactNode;
}

const BoxSet = ({ children }: IBoxSetProps) => {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    paddingTop: "4rem",
    paddingBottom: "4rem",
  } as SystemStyleObject;

  const boxSetStyle = {
    ...containerStyle,
    ".two-tone-box": {
      backgroundImage:
        "linear-gradient(330deg, white, white 50%, #36678d 1px, #36678d 50%)",
      boxShadow: "0 0 1rem rgba(0, 0, 0, .25)",
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "h3, p": {
        display: "inline",
      },
      h3: {
        padding: "2rem",
        margin: 0,
        color: "white",
      },
      ".content-container": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
        marginLeft: "1rem",
        padding: "1rem",
        marginRight: "1rem",
        borderRadius: "32px",
        overflow: "hidden",
        flexGrow: "1",
        flexShrink: "1",
        flexBasis: "0%",
        p: {
          overflow: "hidden",
          flexGrow: "1",
          flexShrink: "1",
          flexBasis: "0%",
        },
      },
      ".footer": {
        padding: "2rem",
        // borderTop: "1px solid",
        // borderTopColor: "gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        a: {
          variant: "links.button",
          alignSelf: "bottom",
          padding: "1rem",
        },
      },
    },
    ".box-1": {
      backgroundImage:
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
      width: "100%",
      marginBottom: "2rem",
      borderRadius: 8,
      height: ["initial", "initial", "calc((100vw - (100vw - 120ch)) / 3)"],
    },
    ".box-3": {
      backgroundImage: [
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(330, white, white 50%, #36678d 1px, #36678d 50%)",
      ],
      width: ["100%", "100%", "30%"],
      marginBottom: "2rem",
      borderRadius: 8,
      height: ["initial", "initial", "calc((100vw - (100vw - 120ch)) / 3)"],
    },
    ".box-2": {
      backgroundImage: [
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(-15deg, white, white 50%, #36678d 1px, #36678d 50%)",
        "linear-gradient(330, white, white 50%, #36678d 1px, #36678d 50%)",
      ],
      width: ["100%", "100%", "calc(50% - 2rem)"],
      marginBottom: "2rem",
      borderRadius: 8,
      height: ["initial", "initial", "calc((100vw - (100vw - 120ch)) / 3)"],
    },
  } as SystemStyleObject;

  return (
    <Box sx={boxSetStyle} className="box-set">
      {children}
    </Box>
  );
};

export default BoxSet;
