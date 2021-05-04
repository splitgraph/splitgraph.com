import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { IconClipboard } from "../Icon";

export interface IPreWithCopyProps {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  extraStyle?: object;
  onCopy?: (message?: string) => void;
}

const PreWithCopy = ({
  children,
  title,
  extraStyle = {},
  onCopy = () => {},
}: IPreWithCopyProps) => {
  const preContainerStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    ...extraStyle,
    pre: {
      padding: "1rem",
      backgroundColor: "sglightblue.light",
      width: "100%",
      overflowX: "hidden",
      margin: 0,
      ...(extraStyle.hasOwnProperty(".pre") ? extraStyle[".pre"] : {}),
    },
    code: {
      maxWidth: "100%",
      wordBreak: "break-all",
      ...(extraStyle.hasOwnProperty("code") ? extraStyle["code"] : {}),
    },
    ".pre-title": {
      fontWeight: "bold",
      color: "heavy",
      ...(extraStyle.hasOwnProperty(".pre-title")
        ? extraStyle[".pre-title"]
        : {}),
    },
    ".pre-row": {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "sglightblue.light",
      ...(extraStyle.hasOwnProperty(".pre-row") ? extraStyle[".pre-row"] : {}),
    },
    ".copy-icon-container": {
      display: "flex",
      alignItems: "center",
      marginRight: "1rem",
      marginLeft: "1rem",
      ":hover": {
        cursor: "pointer",
      },
      ...(extraStyle.hasOwnProperty(".copy-icon-container")
        ? extraStyle[".copy-icon-container"]
        : {}),
    },
  };

  const codeRef = React.useRef<HTMLElement>(null);

  const handleClickCopy = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (!codeRef.current) {
      return;
    }

    const range = document.createRange();
    range.selectNode(codeRef.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand("copy");

    onCopy("Copied to clipboard");
  };

  return (
    <Box sx={preContainerStyle}>
      {title && typeof title === "string" ? (
        <Typography className="pre-title">{title}</Typography>
      ) : title ? (
        title
      ) : null}
      <Box className="pre-row">
        <pre>
          <code ref={codeRef}>{children}</code>
        </pre>
        <Box
          className="copy-icon-container"
          onClick={handleClickCopy}
          title="Copy to clipboard"
        >
          <IconClipboard color={"primary.main"} />
        </Box>
      </Box>
    </Box>
  );
};
export default PreWithCopy;
