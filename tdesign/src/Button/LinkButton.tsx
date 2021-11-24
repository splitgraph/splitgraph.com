import { Button, ButtonProps, Typography } from "@material-ui/core";

interface ILinkButtonProps extends ButtonProps {
  small?: boolean;
}
const LinkButton = ({ sx, small, children, ...rest }: ILinkButtonProps) => {
  return (
    <Button
      sx={{
        color: small ? "grays.gray22.main" : "#36CBAE", // TODO clarify if & where "On Surface" colors (confusingly named) should be computed
        textDecoration: small ? "underline" : "inherit",
        ":hover": {
          background: "inherit",
          textDecoration: "underline",
          color: small ? "grays.gray22.main" : "inherit",
        },
        ":focus": {
          textDecoration: "underline",
          textDecorationColor: "black",
        },
        ...sx,
      }}
      {...(rest as any)}
    >
      <Typography variant={small ? "small" : "bodyHighlighted"}>
        {children}
      </Typography>
    </Button>
  );
};

export default LinkButton;
