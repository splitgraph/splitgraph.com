import { Box, Grid, Typography, FormControl, Button } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";
import { ClickToCopyInput, Input } from "../Input";
import { IconDelete } from "../Icon";

interface ISQLCredentialsNicknameRowProps {
  name?: string;
  handleDelete?: () => void;
}

const SQLCredentialsNicknameRow = ({
  handleDelete,
}: ISQLCredentialsNicknameRowProps) => {
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
            <FormControl fullWidth>
              <label htmlFor="nickname-input">
                <Typography variant="small">Nickname</Typography>
              </label>
              <Input id="nickname-input" fullWidth></Input>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <label htmlFor="username-input">
              <Typography variant="small">Username</Typography>
            </label>
            <ClickToCopyInput id="username-input" fullWidth></ClickToCopyInput>
          </FormControl>
          <Button onClick={handleDelete}>
            <IconDelete />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SQLCredentialsNicknameRow;