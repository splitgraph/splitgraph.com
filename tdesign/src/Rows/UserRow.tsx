import { Box, Typography, Button } from "@material-ui/core";
import { StatusChip2 } from "../StatusChip";
import { InvisibleButton } from "../Button";
import { IconDelete } from "../Icon";

interface IUserRowProps {
  name: string;
  email: string;
  verified: string;
  metadata?: string;
  handleSetAsPrimary: () => void;
  handleDelete: () => void;
}

const UserRow = ({
  name,
  verified,
  email,
  metadata,
  handleSetAsPrimary,
  handleDelete,
}: IUserRowProps) => {
  return (
    <>
      <Box
        sx={{
          display: ["none", "flex"],
          justifyContent: "space-between",
          p: "1em",
          boxSizing: "border-box",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
          borderRadius: "4px",
          border: ({ palette }) => `1px solid ${palette.grays.gray26.main}`,
        }}
      >
        <div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ mr: "8px" }}>
              {name}
            </Typography>
            <StatusChip2 text={verified} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>{email}</Typography>{" "}
            {!!metadata && (
              <Typography>&nbsp;&bull;&nbsp;{metadata}</Typography>
            )}
          </Box>
        </div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InvisibleButton sx={{ mr: "28px" }} onClick={handleSetAsPrimary}>
            Set as Primary
          </InvisibleButton>
          <Button onClick={handleDelete} name="Delete">
            <IconDelete />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: ["block", "none"],
          p: "1em",
          boxSizing: "border-box",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
          borderRadius: "4px",
          border: ({ palette }) => `1px solid ${palette.grays.gray26.main}`,
        }}
      >
        <div>
          <Typography variant="subtitle1" sx={{ mr: "8px" }}>
            {name}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>{email}</Typography>{" "}
            {!!metadata && (
              <Typography>&nbsp;&bull;&nbsp;{metadata}</Typography>
            )}
          </Box>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StatusChip2 text={verified} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InvisibleButton sx={{ mr: "28px" }} onClick={handleSetAsPrimary}>
              Set as Primary
            </InvisibleButton>
            <Button onClick={handleDelete} name="Delete">
              <IconDelete />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserRow;
