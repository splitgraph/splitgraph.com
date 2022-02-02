import type { PropsWithChildren } from "react";
import { Button, Typography } from "@mui/material";
import { IconArrowDown } from "../Icon";

const LoadMoreButton = ({
  children,
  ...rest
}: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <Button
      variant="pill"
      sx={{
        border: ({ palette }) => `1px solid ${palette.flambeeRed.light}`,
        padding: "12px",
        boxShadow: "none",
      }}
      {...rest}
    >
      <IconArrowDown sx={{ mr: "9px", height: "8px" }} />
      <Typography
        variant="bodyHighlighted"
        color="flambeeRed.main"
        sx={{ mr: "20px" }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default LoadMoreButton;
