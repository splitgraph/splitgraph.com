import * as React from "react";
import { Box } from "@material-ui/core";

export interface IMarketingNoticeProps {
  defaultShowBar?: boolean;
  children?: React.ReactNode;
}

const MarketingNotice = ({
  children,
  defaultShowBar = true,
}: IMarketingNoticeProps) => {
  const [showBar, setShowBar] = React.useState(defaultShowBar);

  return showBar ? (
    <Box
      sx={{
        backgroundColor: "sglightblue.main",
        padding: "1rem",
        borderBottom: "1px solid",
        borderBottomColor: "primary.main",
        color: "heavy.main",
        // display: "flex"
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: ["column", "row", "row"],
        ".close-button": {
          marginLeft: "calc(100% - 1ch - 2rem)",
          position: "absolute",
          textAlign: "right",
          marginTop: "-1.5rem",
          ".close-button--control": {
            ":hover": {
              cursor: "pointer",
            },
          },
        },
      }}
    >
      {children}
      <Box className="close-button">
        <span
          onClick={(_) => setShowBar(!showBar)}
          className="close-button--control"
        >
          X
        </span>
      </Box>
    </Box>
  ) : null;
};

export default MarketingNotice;
