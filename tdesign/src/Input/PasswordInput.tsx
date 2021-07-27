import { useState, forwardRef } from "react";
import {
  Box,
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
  IconButton,
} from "@material-ui/core/";
import { IconPasswordHide, IconPasswordSee } from "../Icon";
import { theme } from "../themes/design";

interface State {
  password: string;
  showPassword: boolean;
}

interface IPasswordInputProps extends OutlinedInputProps {
  extraEndAdornment?: React.ReactNode;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (props, ref) => {
    const [values, setValues] = useState<State>({
      password: "",
      showPassword: false,
    });
    const { extraEndAdornment, ...rest } = props;
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };
    return (
      <OutlinedInput
        id="outlined-input-password"
        ref={ref}
        type={values.showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              aria-label="toggle password visibility"
              edge="end"
            >
              {values.showPassword ? <IconPasswordSee /> : <IconPasswordHide />}
            </IconButton>
            {!!extraEndAdornment && (
              <Box sx={{ ml: "1rem" }}>{extraEndAdornment}</Box>
            )}
          </InputAdornment>
        }
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
        {...rest}
      />
    );
  }
);
export default PasswordInput;
