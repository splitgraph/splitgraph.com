import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@material-ui/core";
import { theme } from "../themes/design";

const Input = forwardRef<HTMLInputElement, OutlinedInputProps>((props, ref) => {
  return (
    <OutlinedInput
      ref={ref}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.grays.light.gray26,
          },
          "&:hover fieldset": {
            borderColor: "flambeeBlue.light",
            boxShadow: "0px 4px 8px rgba(115, 176, 255, 0.15)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "flambeeBlue.light",
          },
        },
        "& .MuiOutlinedInput-root.Mui-error": {
          backgroundColor: theme.surfaces.light.error,
          "& fieldset": {
            borderColor: "#B62B35", //TODO is this computed?
          },
        },
      }}
      {...props}
    />
  );
});
export default Input;
