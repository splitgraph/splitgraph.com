import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useContext } from "react";
import { ILayoutContext, LayoutContext } from "./TwoColumnLayout";

import {
  chevronsLeftIconURI,
  chevronsRightIconURI,
  chevronsDownIconURI,
  chevronsUpIconURI,
} from "../../Icon";

export interface TwoColumnLayoutLeftProps {
  children?: React.ReactNode;
}

const ExpandColumnPushDown = ({ expanded, setExpanded }: ILayoutContext) => {
  const pushdownStyle: SxProps<Theme> = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    filter: "invert(1) opacity(0.5)",
    borderTopWidth: "0px",
    borderTopStyle: "solid",
    borderTopColor: "heavy.main",
    backgroundImage: [
      expanded
        ? `url("${chevronsUpIconURI}")`
        : `url("${chevronsDownIconURI}")`,
      expanded
        ? `url("${chevronsUpIconURI}")`
        : `url("${chevronsDownIconURI}")`,
      expanded
        ? `url("${chevronsRightIconURI}")`
        : `url("${chevronsLeftIconURI}")`,
    ],
    backgroundPosition: ["center", "center", expanded ? "center" : "right"],
    ":hover": {
      cursor: "pointer",
    },
  };

  return (
    <Box
      className="expand-col-pushdown"
      sx={pushdownStyle}
      onClick={() => (setExpanded ? setExpanded(!expanded) : true)}
    >
      Expand
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </Box>
  );
};

const TwoColumnLayoutLeft = ({ children }: TwoColumnLayoutLeftProps) => {
  const layoutContext = useContext(LayoutContext);

  const containerStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    ".two-col-left-inner": {
      minHeight: "10vh",
      maxWidth: "100vw",
    },
    ".expand-col-pushdown": {
      minHeight: "5vh",
    },
  };

  return (
    <Box sx={containerStyle} className="two-col-left">
      <Box className="two-col-left-inner">{children}</Box>
      <ExpandColumnPushDown {...layoutContext} />
    </Box>
  );
};

export default TwoColumnLayoutLeft;
