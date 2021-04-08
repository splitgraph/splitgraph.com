/** @jsxImportSource theme-ui */
import { Box } from "@material-ui/core";
import { Text } from "theme-ui";
import { useTheme } from "@material-ui/core/styles";
import MutedLink from "../Link/MutedLink";

const Checkmark = () => {
  return <Text sx={{ marginRight: 2, fontWeight: "bold" }}>&#10003;</Text>;
};

interface SuccessMessageProps {
  message?: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return <>{message}</>;
};

interface ISuccessResetLinkProps {
  text?: string;
  href?: string;
  onClick: () => void;
}

const SuccessResetLink = ({ text, href }: ISuccessResetLinkProps) => (
  <MutedLink sx={{ color: "#fff" }} href={href || "#"}>
    {text}
  </MutedLink>
);

interface ISuccessAlertProps {
  message?: string;
  dismissLinkText?: string;
  dismissLinkHref?: string;
  onClickDismiss?: () => void;
  dismissLinkOwnRow?: boolean;
}

const SuccessAlert = ({
  message,
  dismissLinkText,
  dismissLinkHref = null,
  onClickDismiss,
  dismissLinkOwnRow = false,
}: ISuccessAlertProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "8px",
        marginBottom: 4,
        minWidth: "30vw",
        backgroundColor: theme.palette.successBackground.main,
        backgroundOpacity: 0.2,
        border: `1px solid ${theme.palette.success.main}`,
        ...(dismissLinkOwnRow
          ? {
              flexWrap: "wrap",
            }
          : {}),
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: dismissLinkText && dismissLinkHref && "70%",
        }}
      >
        <Checkmark />
        <SuccessMessage message={message} />
      </Box>

      {dismissLinkText && (dismissLinkHref || onClickDismiss) && (
        <Box
          sx={{
            display: "flex",
            // width: "30%",
            // flexGrow: 1,
            justifyContent: dismissLinkOwnRow ? "flex-start" : "flex-end",
          }}
        >
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
        </Box>
      )}
    </Box>
  );
};

export default SuccessAlert;
