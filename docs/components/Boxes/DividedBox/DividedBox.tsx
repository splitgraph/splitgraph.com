// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from "theme-ui";
import * as React from "react";

interface IRenderMidArgs {
  children?: React.ReactNode;
}

interface ChildProps {
  children?: React.ReactNode;
  className?: string;
}

export interface IDividedBoxProps {
  children?: React.ReactNode;
  renderTop?: () => React.ReactNode;
  renderMid?: (IRenderMidArgs) => React.ReactNode;
  background?: string;
  colors?: [string, string];
  containerStyle?: SystemStyleObject;
  midStyle?: SystemStyleObject;
  topStyle?: SystemStyleObject;
  direction?: "vertical" | "horizontal";
  angle?: number;
  TopComponent?: React.FunctionComponent<ChildProps>;
  MidComponent?: React.FunctionComponent<ChildProps>;
}

const DividedBox = ({
  renderTop = () => null,
  renderMid,
  children,
  background,
  colors,
  containerStyle = {},
  midStyle = {},
  topStyle = {},
  direction = "vertical",
  angle,
  TopComponent = Box,
  MidComponent = Box,
}: IDividedBoxProps) => {
  background = !!background
    ? background
    : !!colors
    ? `linear-gradient(${
        !!angle
          ? `${angle}deg`
          : `to ${direction === "vertical" ? "bottom" : "right"}`
      }, ${colors[0]} 50%, ${colors[1]} 50%)`
    : undefined;

  containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    width: "100%",
    maxWidth: "100vw",
    paddingLeft: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
    paddingRight: ["1rem", "1rem", "calc((100% - 100ch)/2)"],
    background,
    ...containerStyle,
    ".divided-top": {
      color: "light",
      fontSize: [5, 5, 6],
      paddingLeft: ["1rem", "1rem", "4rem"],
      paddingRight: "4rem",
      marginBottom: "0",
      ...(containerStyle.hasOwnProperty(".divided-top")
        ? containerStyle[".divided-top"]
        : ({} as SystemStyleObject)),
      ...topStyle,
    },
    ".divided-mid": {
      backgroundColor: "white",
      paddingTop: "4rem",
      paddingBottom: "4rem",
      marginLeft: ["0.5rem", "0.5rem", "2rem"],
      marginRight: ["0.5rem", "0.5rem", "2rem"],
      paddingLeft: "1rem",
      paddingRight: "1rem",
      width: ["calc(100% - 1rem)", "calc(100% - 1rem)", "calc(100% - 4rem)"],
      borderRadius: 8,
      border: "1px solid heavy",
      boxShadow: "0 0 1rem rgba(0, 0, 0, .25)",
      ...(containerStyle.hasOwnProperty(".divided-mid")
        ? containerStyle[".divided-mid"]
        : ({} as SystemStyleObject)),
      ...midStyle,
    },
  } as SystemStyleObject;

  return (
    <Box sx={containerStyle}>
      <TopComponent className="divided-top">{renderTop()}</TopComponent>
      <MidComponent className="divided-mid">
        {renderMid ? renderMid({ children }) : children}
      </MidComponent>
    </Box>
  );
};

export default DividedBox;