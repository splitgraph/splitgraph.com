import {
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { Input } from "../Input";

export const AddNewUserRow = ({ errorMessage, ...rest }) => {
  return (
    <Box
      sx={{
        padding: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02)",
        borderRadius: "4px",
        border: (theme) => `1px solid ${theme.palette.grays?.gray26.main}`,
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={1} />
        <Grid item md={10}>
          <FormControl fullWidth>
            <label htmlFor="add-new-email-input">
              <Typography variant="small">Add new email</Typography>
            </label>
            <Input id="add-new-email-input" fullWidth {...rest} />
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={1} />
      </Grid>
    </Box>
  );
};
