import { Button, Typography } from "@material-ui/core";
import { IconArrowDown } from "../Icon";

export interface LoadMoreButtonProps {}

const LoadMoreButton = ({ children, ...rest }) => {
  return (
    <Button
      variant="pill"
      sx={{
        border: (theme) => `1px solid ${theme.palette.flambeeRed.light}`,
        padding: "12px",
        boxShadow: "none",
      }}
      {...(rest as any)}
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
