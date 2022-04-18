import { useState, forwardRef } from "react";
import {
  Box,
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { IconPasswordHide, IconPasswordSee } from "../Icon";
import { styles } from "./styles";

interface IPasswordInputProps extends OutlinedInputProps {
  extraEndAdornment?: React.ReactNode;
  tabbable?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { extraEndAdornment, tabbable, ...rest } = props;
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
        inputRef={ref}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              aria-label="toggle password visibility"
              edge="end"
              size="large"
              sx={{
                "&:focus": {
                  boxShadow: ({ palette }) =>
                    `0px 0px 0px 1px ${palette.grays.gray20.main}`,
                },
              }}
              tabIndex={tabbable ? 0 : -1}
            >
              {showPassword ? <IconPasswordSee /> : <IconPasswordHide />}
            </IconButton>
            {!!extraEndAdornment && (
              <Box sx={{ ml: "1rem" }}>{extraEndAdornment}</Box>
            )}
          </InputAdornment>
        }
        sx={styles}
        {...rest}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";
