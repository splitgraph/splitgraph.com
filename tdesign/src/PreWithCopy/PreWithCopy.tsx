// @jsx jsx
// @ts-ignore
import { jsx, Box, Text, SystemStyleObject } from "theme-ui";
import * as React from "react";

import { IconClipboard } from "../Icon";

export interface IPreWithCopyProps {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  extraStyle?: SystemStyleObject;
  onCopy?: (message?: string) => void;
}

const PreWithCopy = ({
  children,
  title,
  extraStyle = {},
  onCopy = () => {},
}: IPreWithCopyProps) => {
  const preContainerStyle = {
    display: "flex",
    flexDirection: "column",
    ...extraStyle,
    pre: {
      padding: "1rem",
      backgroundColor: "lightbluefaded",
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
      backgroundColor: "lightbluefaded",
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
  } as SystemStyleObject;

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
        <Text className="pre-title">{title}</Text>
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
          <IconClipboard color={"primary"} />
        </Box>
      </Box>
    </Box>
  );
};
export default PreWithCopy;
