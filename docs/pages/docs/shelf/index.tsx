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
  StatusChip2,
  UserRow,
  BoxGroup,
  SQLCredentialsRow,
  LinkedOAuthRow,
  GoogleLogoIcon,
  AddOAuthLinkRow,
  Octicon,
  GitLabLogoIcon,
  SQLCredentialsNicknameRow,
} from "@splitgraph/tdesign";
import TabsDemo from "./tabs";
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
        <br />
        <PasswordInput error />
        <br />
        <Paper sx={{ p: "1rem" }}>
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
      <Grid item xs={2}>
        ErrorAlert2 (message prop, legacy)
        <ErrorAlert2 message="We couldn't find an account that matches user@example.com email. Need an account?" />
        <br />
        ErrorAlert2 (children)
        <ErrorAlert2>
          We couldn't find an account that matches user@example.com email. Need
          an account?
        </ErrorAlert2>
      </Grid>
      <Grid item xs={2}>
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
      <Grid item xs={5}>
        Verified
        <StatusChip2 text={"Verified"} />
        Unverified
        <StatusChip2 text={"Unverified"} />
      </Grid>
      <br />
      <Grid item xs={5}>
        Tabs
        <TabsDemo />
      </Grid>
      <Grid item>
        UserRow
        <UserRow
          name="Sophy"
          verified="Unverified"
          email={"user@example.com"}
          handleSetAsPrimary={() => console.log("handleSetAsPrimary()")}
          handleDelete={() => console.log("handleDelete()")}
        />
      </Grid>
      <br />
      <br />
      <Grid item>
        SQLCredentialsRow
        <SQLCredentialsRow />
      </Grid>
      <br />
      <br />
      <Grid item>
        LinkedOAuthRow
        <LinkedOAuthRow
          name="Nicolas Panero"
          email="nicolas.panero@example.com"
        >
          <InvisibleButton>
            <GoogleLogoIcon />
            Unlink
          </InvisibleButton>
        </LinkedOAuthRow>
      </Grid>
      <br />
      <br />
      <Grid item>
        AddOAuthLinkRow
        <AddOAuthLinkRow>
          <InvisibleButton>
            <Octicon /> GitHub
          </InvisibleButton>
          <InvisibleButton>
            <GitLabLogoIcon /> GitLab
          </InvisibleButton>
          <InvisibleButton>
            <GoogleLogoIcon /> Google
          </InvisibleButton>
        </AddOAuthLinkRow>
      </Grid>
      <br />
      <br />
      <Grid item>
        BoxGroup
        <BoxGroup>
          <UserRow
            name="Alice"
            verified="Verified"
            email={"alice@example.com"}
            handleSetAsPrimary={() => {}}
            handleDelete={() => {}}
          />
          <UserRow
            name="Christian Really Long Name"
            verified="Unverified"
            email={"christian@example.com"}
            metadata={"Owner"}
            handleSetAsPrimary={() => {}}
            handleDelete={() => {}}
          />
          <SQLCredentialsRow />
          <LinkedOAuthRow
            name="Nicolas Panero"
            email="nicolas.panero@example.com"
          >
            <InvisibleButton>
              <GoogleLogoIcon />
              Unlink
            </InvisibleButton>
          </LinkedOAuthRow>
        </BoxGroup>
      </Grid>
      <br />
      <br />
      <Grid item>
        SQLCredentialsNicknameRow
        <SQLCredentialsNicknameRow />
      </Grid>
    </Paper>
  );
};

export default withMuiTheme(ThemeDemo);
