/** @jsxImportSource theme-ui */
import { Box, Typography } from "@material-ui/core";
import MutedLink from "../Link/MutedLink";

const ErrorHeading = () => {
  return (
    <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>Error:</Typography>
  );
};

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <>{message}</>;
};

interface ErrorResetLinkProps {
  text?: string;
  href?: string;
}

const ErrorResetLink = ({ text }: ErrorResetLinkProps) => (
  <MutedLink href={"#"}>{text}</MutedLink>
);

export interface ErrorAlertProps {
  message?: string;
  dismissLinkText?: string;
  dismissLinkHref?: string;
}

const ErrorAlert = ({
  message,
  dismissLinkText,
  dismissLinkHref,
}: ErrorAlertProps) => {
  const trimmedMessage = message ? message.replace(/Error\:?\s*/, "") : "";

  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: 4,
        justifyContent: "space-between",
        flexDirection: "row",
        minWidth: "30vw",
        backgroundColor: "white",
        backgroundOpacity: 0.2,
        border: "1px solid red",
        padding: 8,
      }}
    >
      <Box sx={{ display: "flex", width: 7 / 10 }}>
        <ErrorHeading />
        <ErrorMessage message={trimmedMessage} />
      </Box>

      {dismissLinkText && dismissLinkHref && (
        <Box
          sx={{ display: "flex", width: 3 / 10, justifyContent: "flex-end" }}
        >
          <ErrorResetLink text={dismissLinkText} href={dismissLinkHref} />
        </Box>
      )}
    </Box>
  );
};

export default ErrorAlert;
