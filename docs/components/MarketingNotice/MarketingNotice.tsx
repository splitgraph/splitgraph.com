/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box } from "theme-ui";
import * as React from "react";

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
        backgroundColor: "sglightblue",
        padding: "1rem",
        borderBottom: "1px solid",
        borderBottomColor: "primary",
        color: "heavy",
        // display: "flex"
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: ["column", "row", "row"],
        a: {
          variant: "links.primary",
        },
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
