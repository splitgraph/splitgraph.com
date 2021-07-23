import { Box, Typography, Button } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";
import { StatusChip2 } from "../StatusChip";
import { InvisibleButton } from "../Button";
import { IconDelete } from "../Icon";

interface IUserRowProps {
  name: string;
  email: string;
  verified: string;
  handleSetAsPrimary: () => void;
  handleDelete: () => void;
}

const UserRow = ({
  name,
  verified,
  email,
  handleSetAsPrimary,
  handleDelete,
}: IUserRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
        borderRadius: "4px",
        border: `1px solid ${designTheme.grays.light.gray26};`,
      }}
    >
      <div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: "8px" }}>
            {name}
          </Typography>
          <StatusChip2 text={verified} />
        </Box>
        <Typography>{email}</Typography>
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
  );
};

export default UserRow;
