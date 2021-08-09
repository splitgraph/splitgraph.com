const prismTheme = {
  color: "#e0ffff",
  backgroundColor: "primary",
  // backgroundColor: "red",
  ".changed,.operator": { color: "#ffd700" },
  ".deleted": { color: "#ffa07a77" },
  ".inserted": { color: "#66cc99" },
  ".comment": { color: "#81cfe0", fontStyle: "italic" },
  ".punctuation": { color: "#e0ffff" },
  ".constant": { color: "#dcc6e0" },
  ".string,.url": { color: "#00ff7f" },
  ".variable": { color: "#36d7b7" },
  ".number,.boolean,.attr-value": { color: "#ffecdb" },
  ".attr-name": { color: "#ffb454" },
  ".keyword,.key,.property,.namespace,.tag,.selector,.doctype": {
    color: "#00ffff",
  },
  ".builtin,.char,.constant,.function,.class-name,.symbol": {
    color: "#ffa07a",
  },
  // Used by shell-session
  ".output": {
    color: "#e0ffff",
  },
  ".important,.language-bash": {
    color: "#ffa07a",
  },
};

export default prismTheme;
