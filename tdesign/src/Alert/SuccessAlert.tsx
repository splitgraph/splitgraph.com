import { Box, Typography } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import MuiLink from "../Link/MuiLink";

const Checkmark = () => {
  return (
    <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>
      &#10003;
    </Typography>
  );
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
  <MuiLink sx={{ color: "#fff" }} href={href || "#"}>
    {text}
  </MuiLink>
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
  const styles: SxProps<Theme> = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "8px",
    marginBottom: "4px",
    minWidth: "30vw",
    backgroundColor: "rgba(59, 141, 54, 0.5)",
    border: ({ palette }) => `1px solid ${palette.success.main}`,
    ...(dismissLinkOwnRow
      ? {
          flexWrap: "wrap",
        }
      : {}),
  };
  return (
    <Box sx={styles}>
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
            <Typography
              sx={{
                color: "muted",
                ":hover": { cursor: "pointer", textDecoration: "underline" },
              }}
              onClick={onClickDismiss}
            >
              {dismissLinkText}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SuccessAlert;
