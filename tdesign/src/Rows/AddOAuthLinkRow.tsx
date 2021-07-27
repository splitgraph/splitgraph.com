import { Box, Typography } from "@material-ui/core";
import { theme as designTheme } from "../themes/design";

interface IAddOAuthLinkRowProps {
  children: React.ReactNode;
}

const AddOAuthLinkRow = ({ children }: IAddOAuthLinkRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: "1em",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.02);",
        borderRadius: "4px",
        border: `1px solid ${designTheme.grays.light.gray26};`,
      }}
    >
      <Typography variant="bodyHighlighted" sx={{ ml: "1rem", mr: "29px" }}>
        Add a new user
      </Typography>
      {children}
    </Box>
  );
};

export default AddOAuthLinkRow;
