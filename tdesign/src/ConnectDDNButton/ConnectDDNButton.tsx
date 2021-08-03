import { Button } from "@material-ui/core";

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
    <Button
      variant="contained"
      href={connectParams ? `${connectURL}?${connectParams}` : `${connectURL}`}
      sx={{ backgroundColor: "legacySecondary.main" }}
    >
      {children || <>Connect to DDN</>}
    </Button>
  );
};

export default ConnectDDNButton;
