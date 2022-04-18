import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { styles } from "./styles";

export const Input = forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => <OutlinedInput inputRef={ref} sx={styles} {...props} />
);

Input.displayName = "Input";
