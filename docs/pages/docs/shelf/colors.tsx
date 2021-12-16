import { forwardRef } from "react";
import { Paper, Box, Typography, Tooltip } from "@material-ui/core";
import withMuiTheme from "@splitgraph/tdesign/src/themes/withMUITheme";
import { useTheme } from "@material-ui/core/styles";

const ThemeDemo = () => {
  const {
    palette: { mode, divider, getContrastText, augmentColor, ...rest },
    palette,
  } = useTheme();
  console.log("palette", palette);
  return (
    <Paper sx={{ m: "1rem", p: "1rem" }}>
      {Object.entries(rest).map(([key, value]) => {
        return (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ minWidth: "200px", minHeight: "52px" }}>
              <Typography variant="subtitle1">{key}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              {Object.entries(value).map((color, index) => (
                <Tooltip title={color[1]} key={index}>
                  <Swatch color={color} />
                </Tooltip>
              ))}
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};

interface SwatchProps {
  color: any;
}
const Swatch = forwardRef<HTMLDivElement, SwatchProps>((props, ref) => {
  const { color } = props;
  return (
    <Paper
      component="div"
      sx={{
        display: "inline",
        width: "48px",
        height: "48px",
        backgroundColor: color,
        transition:
          "transform 165ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 380ms cubic-bezier(0.4, 0, 0.2, 1) 215ms, background 500ms linear",
        ":hover": {
          boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
          transform: "scale(1.15)",
          zIndex: 100,
        },
      }}
      ref={ref}
      {...props}
    >
      &nbsp;
    </Paper>
  );
});

export default withMuiTheme(ThemeDemo);
