import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { SxProps } from "@material-ui/system";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

interface IPaddedSingleColProps {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  extraStyle?: SxProps<Theme>;

  /** Not literally padding-left. Will be set as minWidth of left spacer. */
  leftPadding?: string | number;
  /** Not literally padding-right. Will be set as minWidth of left spacer. */
  rightPadding?: string | number;
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
      width: theme.constants.paddedColumnLeftWidth,
    },
    ".right-spacer": {
      width: theme.constants.paddedColumnRightWidth,
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
