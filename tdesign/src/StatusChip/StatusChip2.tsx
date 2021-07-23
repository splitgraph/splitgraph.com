import { Box, Typography } from "@material-ui/core";
import { theme } from "../themes/design";
export interface IStatusChipProps {
  text?: string;
}

const StatusChip2 = ({ text }: IStatusChipProps) => {
  const isVerified = text?.toLowerCase() === "verified";

  return (
    <Box
      sx={{
        ".status-chip": {
          padding: "1px 8px 2px",
          background: (theme) => theme.palette.common.white,
          border: `1px solid ${
            isVerified ? "#36CBAE" : theme.grays.light.gray25
          }`, //TODO: this is called 'on success' but appears to be hardcoded
          borderRadius: "4px",
        },
        ".status-chip--text": {
          color: isVerified ? "#36CBAE" : theme.grays.light.gray22,
        },
      }}
    >
      <span className="status-chip">
        <span className="status-chip--text">
          <Typography variant="smallHighlightedSB">{text}</Typography>
        </span>
      </span>
    </Box>
  );
};

export default StatusChip2;
