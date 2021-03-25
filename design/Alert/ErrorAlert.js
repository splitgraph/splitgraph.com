import { Flex, Text } from "rebass";
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
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      p={2}
      mb={4}
      sx={{
        minWidth: "30vw",
        backgroundColor: "errorBackground",
        backgroundOpacity: 0.2,
        border: "1px solid red"
      }}
    >
      <Flex width={7 / 10}>
        <ErrorHeading />
        <ErrorMessage message={trimmedMessage} />
      </Flex>

      {dismissLinkText && dismissLinkHref && (
        <Flex width={3 / 10} justifyContent="flex-end">
          <ErrorResetLink text={dismissLinkText} href={dismissLinkHref} />
        </Flex>
      )}
    </Flex>
  );
};

export default ErrorAlert;
