import { Box, Grid, Typography } from "@mui/material";
import { Button } from "../Button";
import SQLWarningIcon from "./SQLWarningIcon";

interface ISQLCredentialsRowProps {
  message?: React.ReactNode;
  handleClick?: () => void;
}

const SQLNewCredentialsRow = ({
  message,
  handleClick,
}: ISQLCredentialsRowProps) => {
  return (
    <Box
      sx={{
        p: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
        borderRadius: "4px",
        border: ({ palette }) => `1px solid ${palette.grays.gray26.main};`,
      }}
    >
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid
          item
          xs={12}
          md={1}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <SQLWarningIcon />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography sx={{ ml: "1em" }}>
              {message || (
                <span>
                  <strong>Need credentials?</strong> If you want to have your
                  own username and password you need to create new credentials.
                </span>
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button onClick={handleClick}>New Credentials</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SQLNewCredentialsRow;
