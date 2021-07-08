import { Grid, Paper } from "@material-ui/core";
import withMuiTheme from "@splitgraph/tdesign/src/themes/withMUITheme";
import { PasswordInput } from "@splitgraph/tdesign/src/Input";

const ThemeDemo = () => {
  return (
    <Paper>
      <Grid item xs={5}>
        <PasswordInput />
        <PasswordInput error />
      </Grid>
    </Paper>
  );
};

export default withMuiTheme(ThemeDemo);
