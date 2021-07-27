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
import InFieldButton from "../Button/InFieldButton";

const PasswordButtonInput = forwardRef<HTMLInputElement, OutlinedInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
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
          ref={ref}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                aria-label="toggle password visibility"
                edge="end"
                sx={{ "&:hover": { background: "none" }, mr: "16px" }}
              >
                {showPassword ? <IconPasswordSee /> : <IconPasswordHide />}
              </IconButton>
              <InFieldButton>Create</InFieldButton>
            </InputAdornment>
          }
          {...props}
        />
      </Box>
    );
  }
);
export default PasswordButtonInput;