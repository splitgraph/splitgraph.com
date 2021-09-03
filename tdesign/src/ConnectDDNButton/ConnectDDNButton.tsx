import { Button, Link } from "@material-ui/core";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles";

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
