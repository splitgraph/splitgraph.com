import { Box } from "@material-ui/core";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export interface IConnectDDNButtonProps {
  connectParams?: string;
  children?: React.ReactNode;
  connectURL?: string;
}

const ConnectDDNButton = ({
  connectURL = `/connect`,
  connectParams,
  children,
}: IConnectDDNButtonProps) => {
  return (
    <Box
      sx={
        {
          a: {
            display: "block",
            // variant: "buttons.secondary",
            padding: "0.5rem",
            textDecoration: "none",
            ":hover": {
              color: "sglightblue.main",
              cursor: "pointer",
            },
          },
        } as SxProps<Theme>
      }
    >
      <a
        href={
          connectParams ? `${connectURL}?${connectParams}` : `${connectURL}`
        }
      >
        {children || <>Connect to DDN</>}
      </a>
    </Box>
  );
};

export default ConnectDDNButton;
