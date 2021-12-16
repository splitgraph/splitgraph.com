import { Box } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

export interface IMainContentProps {
  children: React.ReactNode;
  extraStyle?: SxProps<Theme>;
}

const mainContentStyle: SxProps<Theme> = {};

const MainContent = ({ children, extraStyle = {} }: IMainContentProps) => {
  const outerContainerStyle = {
    // backgroundColor: "white",
    minHeight: "100vh",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
    ...extraStyle,
  };

  return (
    <Box className="main-content" sx={outerContainerStyle}>
      <Box sx={mainContentStyle}>{children}</Box>
    </Box>
  );
};

export default MainContent;
