import { Grid, Paper, FormControl } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import withMuiTheme from "@splitgraph/tdesign/src/themes/withMUITheme";
import {
  PasswordInput,
  ClickToCopyInput,
  PasswordButtonInput,
  // ClickToCopySelect,
} from "@splitgraph/tdesign/src/Input";
import {
  InFieldButton,
  Button,
  InvisibleButton,
  LinkButton,
  ErrorAlert2,
  SuccessAlert2,
} from "@splitgraph/tdesign";
import { useForm } from "react-hook-form";

const ThemeDemo = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Paper sx={{ m: "1rem", p: "1rem" }}>
      <Grid item xs={5}>
        <FormControl variant="outlined">
          PasswordInput
          <PasswordInput />
        </FormControl>
        <br />
        PasswordInput (error)
        <PasswordInput error />
        <br />
        <Paper>
          ClickToCopyInput
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <ClickToCopyInput {...register("example")} />
            </FormControl>
            <input type="submit" />
          </form>
        </Paper>
        {/* ClickToCopySelect */}
        {/* <ClickToCopySelect /> */}
        Button (large)
        <br />
        <Button
          icon={<MailOutlineIcon sx={{ position: "absolute", left: "15px" }} />}
          large
        >
          Complete form to Sign in
        </Button>
        <br />
        <br />
        Button (disabled)
        <br />
        <br />
        <Button disabled>Get Started - FREE</Button>
        <br />
        <br />
        Button (startIcon prop)
        <br />
        <Button startIcon={<MailOutlineIcon />}>Get Started - FREE</Button>
        <br />
        <br />
        <Button startIcon={<MailOutlineIcon />}>Delete</Button>
      </Grid>
      <br />
      <br />
      <br />
      {"InFieldButton (used in certain <Input>s)"}
      <br />
      <InFieldButton>Create</InFieldButton>
      <br />
      <br />
      InFieldButton (disabled)
      <br />
      <InFieldButton disabled>Create</InFieldButton>
      <br />
      <br />
      <br />
      PasswordButtonInput
      <PasswordButtonInput />
      <br />
      <br />
      so-called "InvisibleButton"
      <br />
      <InvisibleButton>Set as Primary</InvisibleButton>
      <br />
      <br />
      LinkButton
      <br />
      <LinkButton>Sign up</LinkButton>
      <br />
      <br />
      LinkButton (small)
      <br />
      <LinkButton small>Forgot your password?</LinkButton>
      <br />
      <br />
      <Grid item xs={5}>
        ErrorAlert2 (message prop, legacy)
        <ErrorAlert2 message="We couldn't find an account that matches user@example.com email. Need an account?" />
        <br />
        ErrorAlert2 (children)
        <ErrorAlert2>
          We couldn't find an account that matches user@example.com email. Need
          an account?
        </ErrorAlert2>
      </Grid>
      <Grid item xs={5}>
        SuccessAlert2 (message prop, legacy)
        <SuccessAlert2
          message="If an account for user@example.com exists, we will send and email with a reset link."
          dismissLinkText="OK"
        />
        <br />
        <br />
        SuccessAlert2 (children)
        <SuccessAlert2>
          If an account for user@example.com exists, we will send and email with
          a reset link.
        </SuccessAlert2>
      </Grid>
      <br />
    </Paper>
  );
};

export default withMuiTheme(ThemeDemo);
