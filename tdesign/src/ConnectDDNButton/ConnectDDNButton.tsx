import { Button, Link } from "@mui/material";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

export interface IConnectDDNButtonProps {
  connectParams?: string;
  children?: React.ReactNode;
  connectURL?: string;
  sx?: SxProps<Theme>;
}

const ConnectDDNButton = ({
  connectURL = `/connect`,
  connectParams,
  children,
  sx,
  ...rest
}: IConnectDDNButtonProps) => {
  return (
    <Button
      component={Link}
      variant="contained"
      href={connectParams ? `${connectURL}?${connectParams}` : `${connectURL}`}
      sx={sx}
      endIcon={<ArrowRightAlt />}
      {...(rest as any)}
    >
      {children || <>Connect to DDN</>}
    </Button>
  );
};

export default ConnectDDNButton;
