/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx, Box } from "theme-ui";
import * as React from "react";

export interface IConnectDDNButtonProps {
  connectParams?: string;
  children?: React.ReactNode;
  connectURL?: string;
}

const ConnectDDNButton = ({
  connectURL = `/connect`,
  connectParams,
  children,
}: IConnectDDNButtonProps) => {
  return (
    <Box
      sx={{
        a: {
          display: "block",
          variant: "buttons.secondary",
          padding: "0.5rem",
          textDecoration: "none",
          ":hover": {
            color: "sglightblue",
            cursor: "pointer",
          },
        },
      }}
    >
      <a
        href={
          connectParams ? `${connectURL}?${connectParams}` : `${connectURL}`
        }
      >
        {children || <>Connect to DDN</>}
      </a>
    </Box>
  );
};

export default ConnectDDNButton;
