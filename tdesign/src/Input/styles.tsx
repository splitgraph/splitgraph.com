export const styles = {
  ".MuiOutlinedInput-input": {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "8px",
    paddingLeft: "16px",
    color: "on.background.main",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: ({ palette }) => palette.grays.gray26.main,
    },
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "flambeeBlue.light",
    boxShadow: "0px 4px 8px rgba(115, 176, 255, 0.15)",
  },
  "&.Mui-focused": {
    caretColor: "#2A81F6",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "flambeeBlue.light",
      borderWidth: "1px",
    },
  },
  "&.Mui-error": {
    backgroundColor: ({ palette }) => palette.surfaces.error.main,
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "on.error.main",
    },
  },
};
