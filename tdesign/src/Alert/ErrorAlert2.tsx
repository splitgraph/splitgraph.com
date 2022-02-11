import { Box, Typography } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
import MuiLink from "../Link/MuiLink";
import IconAlertTriangle from "../Icon/IconAlertTriangle";

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

const ErrorResetLink = ({ text, href }: ErrorResetLinkProps) => (
  <MuiLink href={href ?? "#"}>{text}</MuiLink>
);

export interface IErrorAlertProps {
  message?: string;
  dismissLinkText?: string;
  dismissLinkHref?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ErrorAlert = ({
  message,
  dismissLinkText,
  dismissLinkHref,
  children,
  sx,
}: IErrorAlertProps) => {
  const trimmedMessage = message ? message.replace(/Error:?\s*/, "") : "";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 4,
        backgroundColor: (theme) => theme.palette.surfaces.error.main,
        borderRadius: "4px",
        padding: "8px 8px 10px",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {message ? (
          <>
            <ErrorHeading />
            <ErrorMessage message={trimmedMessage} />
          </>
        ) : (
          <>
            <IconAlertTriangle aria-label="error" sx={{ mr: "10px" }} />
            {children}
          </>
        )}
      </Box>

      {dismissLinkText && dismissLinkHref && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", pl: "2rem" }}>
          <ErrorResetLink text={dismissLinkText} href={dismissLinkHref} />
        </Box>
      )}
    </Box>
  );
};

export default ErrorAlert;
