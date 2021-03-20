// @jsx jsx
import { jsx } from "theme-ui";
import * as React from "react";

import { Flex, Text } from "rebass";
import MutedLink from "../Link/MutedLink";

const Checkmark = () => {
  return (
    <Text mr={2} fontWeight="bold">
      &#10003;
    </Text>
  );
};

interface SuccessMessageProps {
  message?: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return <>{message}</>;
};

interface SuccessResetLinkProps {
  text?: string;
  href?: string;
}

const SuccessResetLink = ({ text, href }: SuccessResetLinkProps) => (
  <MutedLink sx={{ color: "#fff" }} href={href || "#"}>
    {text}
  </MutedLink>
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

      {dismissLinkText && dismissLinkHref && (
        <Flex width={3 / 10} justifyContent="flex-end">
          <SuccessResetLink text={dismissLinkText} href={dismissLinkHref} />
        </Flex>
      )}
    </Flex>
  );
};
