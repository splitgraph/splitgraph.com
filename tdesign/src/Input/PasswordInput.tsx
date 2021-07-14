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

const PasswordInput = forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => {
    const [values, setValues] = useState<State>({
      password: "",
      showPassword: false,
    });

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
      <Box
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
      >
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
                {values.showPassword ? (
                  <IconPasswordSee />
                ) : (
                  <IconPasswordHide />
                )}
              </IconButton>
            </InputAdornment>
          }
          {...props}
        />
      </Box>
    );
  }
);
export default PasswordInput;
