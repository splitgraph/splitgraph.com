import { Box, Typography, Avatar } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";

interface ILinkedOAuthRowProps {
  name: string;
  email: string;
  avatar?: string;
  children: React.ReactNode;
}

const LinkedOAuthRow = ({
  name,
  email,
  avatar,
  children,
}: ILinkedOAuthRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
        borderRadius: "4px",
        border: `1px solid ${designTheme.grays.light.gray26};`,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar alt={name}>{avatar}</Avatar>
        <Box sx={{ ml: "1rem" }}>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body">{email}</Typography>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default LinkedOAuthRow;
