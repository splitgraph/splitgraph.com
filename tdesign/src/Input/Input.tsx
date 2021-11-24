import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@material-ui/core";

const Input = forwardRef<HTMLInputElement, OutlinedInputProps>((props, ref) => (
  <OutlinedInput
    inputRef={ref}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: ({ palette }) => palette.grays.gray26.main,
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
        backgroundColor: ({ palette }) => palette.surfaces.error.main,
        "& fieldset": {
          borderColor: "on.error1.main",
        },
      },
    }}
    {...props}
  />
));

export default Input;
