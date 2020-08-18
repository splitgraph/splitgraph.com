import { Flex, Text } from "rebass";
import MutedLink from "../Link/MutedLink";

const Checkmark = () => {
  return (
    <Text mr={2} fontWeight="bold">
      &#10003;
    </Text>
  );
};

const SuccessMessage = ({ message }) => {
  return <>{message}</>;
};

const SuccessResetLink = ({ text, href }) => (
  <MutedLink sx={{ color: "#fff" }} href={href}>
    {text}
  </MutedLink>
);

export default ({
  message,
  dismissLinkText,
  dismissLinkHref,
  onClickDismiss,
}) => {
  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      p={2}
      mb={4}
      sx={{
        minWidth: "30vw",
        backgroundColor: "successBackground",
        backgroundOpacity: 0.2,
        border: "1px solid success",
      }}
    >
      <Flex width={dismissLinkText && dismissLinkHref ? 7 / 10 : 10 / 10}>
        <Checkmark />
        <SuccessMessage message={message} />
      </Flex>

      {dismissLinkText && (dismissLinkHref || onClickDismiss) && (
        <Flex width={3 / 10} justifyContent="flex-end">
          {dismissLinkHref ? (
            <SuccessResetLink
              text={dismissLinkText}
              href={dismissLinkHref || "#"}
              onClick={onClickDismiss}
            />
          ) : (
            <Text
              sx={{
                color: "muted",
                ":hover": { cursor: "pointer", textDecoration: "underline" },
              }}
              onClick={onClickDismiss}
            >
              {dismissLinkText}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};
