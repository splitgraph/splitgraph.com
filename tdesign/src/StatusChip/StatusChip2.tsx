import { Box, Typography } from "@material-ui/core";
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
          border: ({ palette }) =>
            `1px solid ${
              isVerified ? palette.on.success.main : palette.grays.gray25.main
            }`,
          borderRadius: "4px",
        },
        ".status-chip--text": {
          color: ({ palette }) =>
            isVerified ? palette.on.success.main : palette.grays.gray22.main,
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
