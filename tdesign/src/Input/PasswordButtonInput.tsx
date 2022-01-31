import { useState, forwardRef } from "react";
import {
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { IconPasswordHide, IconPasswordSee } from "../Icon";
import InFieldButton from "../Button/InFieldButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export const PasswordButtonInput = forwardRef<
  HTMLInputElement,
  OutlinedInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { disabled } = props;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <OutlinedInput
      ref={ref}
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
            borderColor: "on.error.main",
          },
        },
      }}
      disabled={disabled}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            aria-label="toggle password visibility"
            edge="end"
            sx={{ "&:hover": { background: "none" }, mr: "16px" }}
            size="large"
          >
            {showPassword ? <IconPasswordSee /> : <IconPasswordHide />}
          </IconButton>
          <InFieldButton>
            Create &nbsp;{" "}
            <ArrowRightAltIcon
              sx={{
                ml: "10px",
                color: ({ palette }) =>
                  disabled ? palette.grays.gray22.main : "white",
              }}
            />
          </InFieldButton>
        </InputAdornment>
      }
      {...props}
    />
  );
});
PasswordButtonInput.displayName = "PasswordButtonInput";
