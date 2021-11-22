import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

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
  const outerContainerStyle: SxProps<Theme> = {
    ...theme.grids.threeCol,
    ".left-spacer": {
      width: "max(25px, calc((100vw - 784px) / 2))",
    },
    ".right-spacer": {
      width: "max(25px, calc((100vw - 784px) / 2))",
    },
    ...extraStyle,
  };

  return (
    <Box className={outerClass} sx={outerContainerStyle}>
      <div className="left-spacer">&nbsp;</div>
      <div className={innerClass}>{children}</div>
      <div className="right-spacer">&nbsp;</div>
    </Box>
  );
};

export default PaddedSingleCol;
