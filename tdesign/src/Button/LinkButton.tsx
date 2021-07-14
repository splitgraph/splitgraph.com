import { Button as MuiButton, ButtonProps } from "@material-ui/core";

const LinkButton = ({ sx, ...rest }: ButtonProps) => {
  return (
    <MuiButton
      sx={{
        color: "#36CBAE", // TODO clarify if & where "On Surface" colors (confusingly named) should be computed
        ":hover": {
          background: "inherit",
          textDecoration: "underline",
        },
        ":focus": {
          textDecoration: "underline",
          textDecorationColor: "black",
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export default LinkButton;
