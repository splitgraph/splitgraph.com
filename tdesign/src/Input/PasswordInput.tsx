import { useState, forwardRef } from "react";
import {
  Box,
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { IconPasswordHide, IconPasswordSee } from "../Icon";
import { NestDataObject, FieldValues, FieldError} from 'react-hook-form'

interface IPasswordInputProps extends OutlinedInputProps {
  extraEndAdornment?: React.ReactNode;
  errors?: NestDataObject<FieldValues, FieldError>;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { extraEndAdornment, errors, error, name, ...rest } = props;
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };
    return (
      <>
        <OutlinedInput
          inputRef={ref}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? (
                  <IconPasswordSee />
                ) : (
                  <IconPasswordHide />
                )}
              </IconButton>
              {!!extraEndAdornment && (
                <Box sx={{ ml: "1rem" }}>{extraEndAdornment}</Box>
              )}
            </InputAdornment>
          }
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
  }
);
export default PasswordInput;
