import { forwardRef } from "react";
import {
  OutlinedInput,
  OutlinedInputProps,
  FormHelperText,
} from "@material-ui/core";
import { NestDataObject, FieldValues, FieldError} from 'react-hook-form'

interface IInputProps extends OutlinedInputProps {
  errors?: NestDataObject<FieldValues, FieldError>;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { errors, error, name, ...rest } = props;
  return (
    <>
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
              borderColor: "#B62B35", //TODO is this computed?
            },
          },
        }}
        error={!!errors[name]}
        name={name}
        {...rest}
      />
      {!!errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </>
  );
});
export default Input;
