import { Box, Grid, Typography, FormControl } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";
import { InFieldButton } from "../Button";
import { PasswordInput } from "../Input";

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
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="white" />
              <circle
                cx="20"
                cy="20"
                r="20"
                fill={designTheme.surfaces.light.link}
                fillOpacity="0.13"
              />
              <path
                d="M21.0207 22.2641H18.9776L18.4607 10.9411H21.5376L21.0207 22.2641ZM21.6361 27.3103H18.3622V24.5041H21.6361V27.3103Z"
                fill={designTheme.surfaces.light.link}
              />
            </svg>
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
              extraEndAdornment={<InFieldButton>Create</InFieldButton>}
              fullWidth
            ></PasswordInput>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SQLCredentialsRow;
