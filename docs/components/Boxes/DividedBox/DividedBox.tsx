import * as React from "react";
import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface IRenderMidArgs {
  children?: React.ReactNode;
}

interface ChildProps {
  children?: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

export interface IDividedBoxProps {
  children?: React.ReactNode;
  renderTop?: () => React.ReactNode;
  renderMid?: (IRenderMidArgs) => React.ReactNode;
  background?: string;
  colors?: [string, string];
  containerStyle?: object;
  midStyle?: object;
  topStyle?: object;
  direction?: "vertical" | "horizontal";
  angle?: number;
  ContainerComponent?: React.FunctionComponent<ChildProps>;
  TopComponent?: React.FunctionComponent<ChildProps>;
  MidComponent?: React.FunctionComponent<ChildProps>;
  topClassName?: string;
  containerClassName?: string;
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
  ContainerComponent = Box,
  TopComponent = Box,
  MidComponent = Box,
  topClassName = "",
  containerClassName,
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
      marginBottom: "1rem",
      ...(containerStyle.hasOwnProperty(".divided-top")
        ? containerStyle[".divided-top"]
        : ({} as object)),
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
      boxShadow: "0 0 1rem rgba(0, 0, 0, .25)",
      ...(containerStyle.hasOwnProperty(".divided-mid")
        ? containerStyle[".divided-mid"]
        : ({} as object)),
      ...midStyle,
    },
  };

  return (
    <ContainerComponent sx={containerStyle} className={containerClassName}>
      <TopComponent className={`divided-top ${topClassName}`}>
        {renderTop()}
      </TopComponent>
      <MidComponent className="divided-mid">
        {renderMid ? renderMid({ children }) : children}
      </MidComponent>
    </ContainerComponent>
  );
};

export default DividedBox;
