import { useState } from "react";
import { OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import { IconCopy } from "../Icon";
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
    <OutlinedInput
      sx={{
        "& .MuiOutlinedInput-root": {
          background: ({ palette }) => palette.surfaces.sql.main,
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
            borderColor: "#B62B35", //TODO should this be computed?
          },
        },
      }}
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
  );
};
export default ClickToCopyInput;
