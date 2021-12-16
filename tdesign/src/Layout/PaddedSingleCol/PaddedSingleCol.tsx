import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";

interface IPaddedSingleColProps {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  extraStyle?: SxProps<Theme>;
}

const PaddedSingleCol = ({
  children,
  className,
  innerClassName,
  extraStyle = {},
}: IPaddedSingleColProps) => {
  const theme = useTheme();

  const outerClass = `padded-single-col-grid ${className ?? ""}`.trim();
  const innerClass = `center-padded-content ${innerClassName ?? ""}`.trim();
  const outerContainerStyle = {
    ...theme.grids.threeCol,
    ".left-spacer": {
      width: "max(25px, calc((100vw - 784px) / 2))",
    },
    ".right-spacer": {
      width: "max(25px, calc((100vw - 784px) / 2))",
    },
    ...extraStyle,
  } as SxProps<Theme>;

  return (
    <Box className={outerClass} sx={outerContainerStyle}>
      <div className="left-spacer">&nbsp;</div>
      <div className={innerClass}>{children}</div>
      <div className="right-spacer">&nbsp;</div>
    </Box>
  );
};

export default PaddedSingleCol;
