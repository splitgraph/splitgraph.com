/** @jsxImportSource theme-ui */
import { Box, Text } from "theme-ui";
import MutedLink from "../Link/MutedLink";

const ErrorHeading = () => {
  return (
    <Text mr={2} fontWeight="bold">
      Error:
    </Text>
  );
};

const ErrorMessage = ({ message }) => {
  return <>{message}</>;
};

const ErrorResetLink = ({ text, href }) => (
  <MutedLink sx={{ color: "#fff" }} href={href}>
    {text}
  </MutedLink>
);

const ErrorAlert = ({ message, dismissLinkText, dismissLinkHref }) => {
  const trimmedMessage = message.replace(/Error\:?\s*/, "");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 2,
        marginBottom: 4,
        minWidth: "30vw",
        backgroundColor: "errorBackground",
        backgroundOpacity: 0.2,
        border: "1px solid red",
      }}
    >
      <Box sx={{ display: "flex" }}>
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
