import { Box, Grid, Typography, FormControl } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { InFieldButton } from "../Button";
import { PasswordInput } from "../Input";
import SQLWarningIcon from "./SQLWarningIcon";
interface ISQLCredentialsRowProps {
  message?: React.ReactNode;
  handleClick?: () => void;
}

const SQLCredentialsRow = ({ message }: ISQLCredentialsRowProps) => {
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
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <SQLWarningIcon />
            <Typography sx={{ ml: "1em" }}>
              {message || (
                <span>
                  We do not save <strong>SQL passwords</strong>, but you can
                  always <strong>create new credentials.</strong>
                </span>
              )}
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
