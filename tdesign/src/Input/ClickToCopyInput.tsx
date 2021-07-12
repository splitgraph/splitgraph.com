import { useState } from "react";
import {
  Box,
  OutlinedInput,
  InputAdornment,
  FormControl,
  IconButton,
} from "@material-ui/core/";
import { IconCopy } from "../Icon";
import { theme } from "../themes/design";
import useCopyToClipboard from "./useClickToCopy";

const ClickToCopyInput = (props) => {
  const [value, setValue] = useState("");
  const [_copyStatus, copy] = useCopyToClipboard(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        "& .MuiOutlinedInput-root": {
          background: theme.surfaces.light.sql,
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
            borderColor: "#B62B35", //TODO should this be computed?
          },
        },
      }}
    >
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <OutlinedInput
          id="outlined-input-password"
          value={value}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={copy}
                onMouseDown={handleMouseDown}
                aria-label="toggle password visibility"
                edge="end"
              >
                <IconCopy color={"flambeeBlue.main"} />
              </IconButton>
            </InputAdornment>
          }
          {...props}
        />
      </FormControl>
    </Box>
  );
};
export default ClickToCopyInput;
