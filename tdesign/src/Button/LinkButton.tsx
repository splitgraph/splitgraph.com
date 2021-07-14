import {
  Button as MuiButton,
  ButtonProps,
  Typography,
} from "@material-ui/core";
import { theme } from "../themes/design";

interface ILinkButtonProps extends ButtonProps {
  small?: boolean;
}
const LinkButton = ({ sx, small, children, ...rest }: ILinkButtonProps) => {
  return (
    <MuiButton
      sx={{
        color: small ? "#555656" : "#36CBAE", // TODO clarify if & where "On Surface" colors (confusingly named) should be computed
        textDecoration: small ? "underline" : "inherit",
        ":hover": {
          background: "inherit",
          textDecoration: "underline",
          color: small ? theme.grays.light.gray22 : "inherit",
        },
        ":focus": {
          textDecoration: "underline",
          textDecorationColor: "black",
        },
        ...sx,
      }}
      {...rest}
    >
      <Typography variant={small ? "small" : "bodyHighlighted"}>
        {children}
      </Typography>
    </MuiButton>
  );
};

export default LinkButton;
