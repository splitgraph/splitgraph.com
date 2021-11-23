import { Box, Typography } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import MuiLink from "../Link/MuiLink";
import IconCheckCircle2 from "../Icon/IconCheckCircle2";

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
  <MuiLink sx={{ color: "flambeeLightGray.light" }} href={href || "#"}>
    {text}
  </MuiLink>
);

export interface ISuccessAlertProps {
  message?: string;
  dismissLinkText?: string;
  dismissLinkHref?: string;
  onClickDismiss?: () => void;
  dismissLinkOwnRow?: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const SuccessAlert = ({
  message,
  dismissLinkText,
  dismissLinkHref = null,
  onClickDismiss,
  dismissLinkOwnRow = false,
  children,
  sx,
}: ISuccessAlertProps) => {
  const styles: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    marginBottom: 4,
    borderRadius: "4px",
    padding: "8px 8px 10px",
    color: "#43766C", //TODO consider 'on surface'
    backgroundColor: (theme) => theme.palette.surfaces.success.main,
    ...(dismissLinkOwnRow
      ? {
          flexWrap: "wrap",
        }
      : {}),
    ...sx,
  };
  return (
    <Box sx={styles}>
      <Box
        sx={{
          display: "flex",
          width: dismissLinkText && dismissLinkHref && "70%",
          alignItems: "center",
        }}
      >
        {message ? (
          <>
            <Checkmark />
            <SuccessMessage message={message} />
          </>
        ) : (
          <>
            <IconCheckCircle2 aria-label="error" sx={{ mr: "10px" }} />
            {children}
          </>
        )}
      </Box>

      {dismissLinkText && (dismissLinkHref || onClickDismiss) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: dismissLinkOwnRow ? "flex-start" : "flex-end",
            pl: "2rem",
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
