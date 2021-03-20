// @jsx jsx
import { jsx } from "theme-ui";
import * as React from "react";

import { Flex, Text } from "rebass";
import MutedLink from "../Link/MutedLink";

const ErrorHeading = () => {
  return (
    <Text mr={2} fontWeight="bold">
      Error:
    </Text>
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

export default ({
  message,
  dismissLinkText,
  dismissLinkHref,
}: ErrorAlertProps) => {
  const trimmedMessage = message ? message.replace(/Error\:?\s*/, "") : "";

  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      p={2}
      mb={4}
      sx={{
        minWidth: "30vw",
        backgroundColor: "white",
        backgroundOpacity: 0.2,
        border: "1px solid red",
        padding: 8,
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
