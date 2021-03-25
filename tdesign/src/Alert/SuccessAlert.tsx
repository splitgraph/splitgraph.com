/** @jsxImportSource theme-ui */

import { Flex, Text } from "theme-ui";
import MutedLink from "../Link/MutedLink";

const Checkmark = () => {
  return <Text sx={{ marginRight: 2, fontWeight: "Bold" }}>&#10003;</Text>;
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

const SuccessAlert = ({
  message,
  dismissLinkText,
  dismissLinkHref,
}: ErrorAlertProps) => {
  return (
    <Flex
      sx={{
        marginBottom: 4,
        padding: 2,
        justifyContent: "space-between",
        flexDirection: "row",
        minWidth: "30vw",
        backgroundColor: "successBackground",
        backgroundOpacity: 0.2,
        border: "1px solid success",
      }}
    >
      <Flex
        sx={{ width: dismissLinkText && dismissLinkHref ? 7 / 10 : 10 / 10 }}
      >
        <Checkmark />
        <SuccessMessage message={message} />
      </Flex>

      {dismissLinkText && dismissLinkHref && (
        <Flex sx={{ width: 3 / 10, justifyContent: "flex-end" }}>
          <SuccessResetLink text={dismissLinkText} href={dismissLinkHref} />
        </Flex>
      )}
    </Flex>
  );
};

export default SuccessAlert;
