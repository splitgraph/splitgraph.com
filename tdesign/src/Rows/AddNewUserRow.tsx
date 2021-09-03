// import { forwardRef } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  // OutlinedInputProps,
} from "@material-ui/core";
import { theme as designTheme } from "../themes/design";
import { IconEmail } from "../Icon";
import { InFieldButton } from "../Button";
import { Input } from "../Input";

// const AddNewUserRow = forwardRef<HTMLInputElement, OutlinedInputProps>((props, ref) => {
const AddNewUserRow = (props) => {
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
        <Grid item md={1} />
        <Grid item md={10}>
          <FormControl fullWidth>
            <label htmlFor="add-new-email-input">
              <Typography variant="small">Add new email</Typography>
            </label>
            <Input
              id="add-new-email-input"
              fullWidth
              endAdornment={
                <InFieldButton>
                  <IconEmail sx={{ mr: ".5rem" }} />
                  Add
                </InFieldButton>
              }
              {...props}
            ></Input>
          </FormControl>
        </Grid>
        <Grid item md={1} />
      </Grid>
    </Box>
  );
};

export default AddNewUserRow;
