import { Box, Button } from "@material-ui/core";

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
      sx={{
        display: "inline",
        a: {
          display: "block",
          textDecoration: "none",
          color: "white",
          ":hover": {
            color: "sglightblue.main",
            cursor: "pointer",
          },
          mx: "1rem",
        },
      }}
    >
      <a
        href={
          connectParams ? `${connectURL}?${connectParams}` : `${connectURL}`
        }
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "legacySecondary.main" }}
        >
          {children || <>Connect to DDN</>}
        </Button>
      </a>
    </Box>
  );
};

export default ConnectDDNButton;
