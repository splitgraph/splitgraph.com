import { Button, ButtonProps, Typography } from "@mui/material";

interface ILinkButtonProps extends ButtonProps {
  small?: boolean;
}
const LinkButton = ({ sx, small, children, ...rest }: ILinkButtonProps) => {
  return (
    <Button
      sx={{
        color: ({ palette }) => palette.on.success.main,
        textDecorationColor: ({ palette }) => palette.on.success.main,
        textDecoration: small ? "underline" : "inherit",
        ":hover": {
          background: "inherit",
          textDecoration: "underline",
          color: small ? "grays.gray22.main" : "inherit",
        },
        ":focus": {
          textDecoration: "underline",
          textDecorationColor: "black",
          outline: "1px solid grey",
        },
        ...sx,
      }}
      {...(rest as any)}
    >
      <Typography
        sx={{
          color: ({ palette }) => palette.on.success.main,
        }}
        variant={small ? "small" : "bodyHighlighted"}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default LinkButton;
