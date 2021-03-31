/** @jsxImportSource theme-ui */
import { Text, ThemeUIStyleObject } from "theme-ui";

export interface IIconProps {
  size?: string;
  sx?: any;
  extraStyle?: ThemeUIStyleObject;
  color?: string;
  hoverColor?: string;
}

export interface IBaseIconProps {
  svgURI: string;
  iconSlug: string;
  size?: string;
  color?: string;
  hoverColor?: string;

  // TODO: sx is deprecated here, but leave it around in case somewhere is using it
  sx?: any;
  extraStyle?: ThemeUIStyleObject;
}

const BaseIcon = ({
  size = "24px",
  iconSlug,
  svgURI,
  sx,
  extraStyle = {},
  color,
  hoverColor,
}: IBaseIconProps) => {
  const svgDataURI = `url("${svgURI}")`;

  const maskStyle = {
    WebkitMaskImage: svgDataURI,
    maskImage: svgDataURI,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };

  // When color is specified, since the svg likely does not contain a color,
  // we must use a "mask" to change the color dynamically
  // https://stackoverflow.com/a/46904983/3793499
  return (
    <Text
      className={`sg-icon sg-icon-${iconSlug}`}
      sx={
        {
          ...(color
            ? {
              backgroundColor: color,
              ...maskStyle,
            }
            : { backgroundImage: svgDataURI }),
          ...(hoverColor
            ? {
              ":hover": {
                backgroundColor: hoverColor,
                ...maskStyle,
              },
            }
            : {}),
          backgroundRepeat: "no-repeat",
          backgroundSize: size,
          minWidth: size,
          minHeight: size,
          ...sx,
          ...extraStyle,
        } as ThemeUIStyleObject
      }
    >
      &nbsp;
    </Text>
  );
};

export default BaseIcon;
