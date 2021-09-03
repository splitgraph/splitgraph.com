export interface IGenericOAuthButtonProps {
  button: React.ReactNode;
  identityProvider: string;
  formAction?: string;
  goal?: "login" | "link";
  redirectURL?: string;
}

export interface IOAuthButtonProps
  extends Omit<IGenericOAuthButtonProps, "button" | "identityProvider"> {}

const FORM_ACTION = "/api/forms/submit/auth/oauth/init";

const OAuthButton = ({
  button,
  identityProvider,
  formAction = FORM_ACTION,
  goal = "login",
  redirectURL = "/",
}: IGenericOAuthButtonProps) => {
  return (
    <form action={formAction} method="POST">
      <input type="hidden" name="goal" value={goal} />
      <input type="hidden" name="redirectURL" value={redirectURL} />
      <input type="hidden" name="identityProvider" value={identityProvider} />
      {button}
    </form>
  );
};

export default OAuthButton;
