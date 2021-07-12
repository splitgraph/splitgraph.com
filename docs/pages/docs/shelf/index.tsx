import { Grid, Paper, FormControl } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import withMuiTheme from "@splitgraph/tdesign/src/themes/withMUITheme";
import {
  PasswordInput,
  ClickToCopyInput,
  PasswordButtonInput,
} from "@splitgraph/tdesign/src/Input";
import { InFieldButton, Button } from "@splitgraph/tdesign";
// import SignInPasswordForm from "../../../components/rhf";

const ThemeDemo = () => {
  return (
    <Paper sx={{ m: "1rem", p: "1rem" }}>
      <Grid item xs={5}>
        <FormControl variant="outlined">
          <PasswordInput />
        </FormControl>
        <br />
        <PasswordInput error />
        <br />
        <ClickToCopyInput />
        <hr />
        <Button
          icon={<MailOutlineIcon sx={{ position: "absolute", left: "15px" }} />}
          large
        >
          Complete form to Sign in
        </Button>
        <br />
        <br />
        <Button disabled>Get Started - FREE</Button>
        <br />
        <br />
        <Button startIcon={<MailOutlineIcon />}>Get Started - FREE</Button>
        <br />
        <br />
        <Button startIcon={<MailOutlineIcon />}>Delete</Button>
        <br />
        <br />
        <br />
        <InFieldButton>Create</InFieldButton>
        <br />
        <br />
        <InFieldButton disabled>Create</InFieldButton>
        <br />
        <br />
        <br />
        <PasswordButtonInput />
        {/* <SignInPasswordForm
          formErrors={{}}
          suggestedUsernameOrEmail={"asdf"}
          redirect={"someUrl"}
        /> */}
      </Grid>
    </Paper>
  );
};

export default withMuiTheme(ThemeDemo);
