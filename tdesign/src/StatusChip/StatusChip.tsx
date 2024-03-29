import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

export interface IStatusChipProps {
  color: string;
  icon: React.ReactNode;
  text?: string;
  responsiveText?: boolean;
  extraStyle: SxProps<Theme>;
}

const StatusChip = ({
  color,
  icon,
  text,
  responsiveText = false,
  extraStyle = {},
}: IStatusChipProps) => {
  const containerStyle = {
    ...extraStyle,
    ".status-chip": {
      display: "inline-flex",
      alignItems: "center",
      border: "1px solid",
      textTransform: "uppercase",
      fontSize: "xx-small",
      backgroundColor: "white",
      borderRadius: "1em",
      color: color,
      borderColor: color,
      ...(extraStyle.hasOwnProperty(".status-chip")
        ? extraStyle[".status-chip"]
        : {}),
    },
    ".status-chip--icon": {
      borderRight: responsiveText
        ? ["initial", "1px solid", "1px solid"]
        : "1px solid",
      padding: "1ch",
      borderColor: color,
      ...(extraStyle.hasOwnProperty(".status-chip--icon")
        ? extraStyle[".status-chip--icon"]
        : {}),
    },
    ".status-chip--text": {
      padding: "1ch",
      display: responsiveText ? ["none", "initial", "initial"] : undefined,
      ...(extraStyle.hasOwnProperty(".status-chip--icon")
        ? extraStyle[".status-chip--text"]
        : {}),
    },
  } as SxProps<Theme>;

  return (
    <Box sx={containerStyle}>
      <span className="status-chip">
        <span className="status-chip--icon">{icon}</span>
        <span className="status-chip--text">{text}</span>
      </span>
    </Box>
  );
};

export default StatusChip;
