import { Box, Typography } from "@material-ui/core";

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
        border: ({ palette }) => `1px dashed ${palette.grays.gray26.main};`,
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
