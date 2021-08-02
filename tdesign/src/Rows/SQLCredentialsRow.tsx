import { Box, Grid, Typography, FormControl } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { InFieldButton } from "../Button";
import { PasswordInput } from "../Input";
import SQLWarningIcon from "./SQLWarningIcon";
interface ISQLCredentialsRowProps {
  name?: string;
  handleClick?: () => void;
}

const SQLCredentialsRow = ({}: ISQLCredentialsRowProps) => {
  return (
    <Box
      sx={{
        p: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
        borderRadius: "4px",
        border: `1px solid ${designTheme.grays.light.gray26};`,
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <SQLWarningIcon />
            <Typography sx={{ ml: "1em" }}>
              We do not save <strong>SQL passwords</strong>, but you can always{" "}
              <strong>create new credentials.</strong>
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <label htmlFor="sql-credentials-input">
              <Typography variant="small">Account Password</Typography>
            </label>
            <PasswordInput
              id="sql-credentials-input"
              extraEndAdornment={
                <InFieldButton>
                  <Typography variant="bodyHighlighted">Create</Typography>
                  <ArrowRightAltIcon
                    sx={{
                      ml: "10.4px",
                      color: (theme) => theme.palette.common.white,
                    }}
                  />
                </InFieldButton>
              }
              fullWidth
            ></PasswordInput>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SQLCredentialsRow;
