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
} from "@splitgraph/tdesign";
import { useForm } from "react-hook-form";
// import SignInPasswordForm from "../../../components/rhf";

const ThemeDemo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
            <ClickToCopyInput {...register("example")} />
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
