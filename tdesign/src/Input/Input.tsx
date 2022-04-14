import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";

export const Input = forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => (
    <OutlinedInput
      inputRef={ref}
      sx={{
        ".MuiOutlinedInput-input": {
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          padding: "8px",
          paddingLeft: "16px",
          fontColor: "on.backgroun.main",
        },
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
        "&.Mui-error": {
          backgroundColor: ({ palette }) => palette.surfaces.error.main,
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "on.error.main",
          },
        },
      }}
      {...props}
    />
  )
);

Input.displayName = "Input";
