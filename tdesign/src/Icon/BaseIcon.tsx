// @jsx jsx
// @ts-ignore
import { jsx, Text, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IIconProps {
  size?: string;
  sx?: any;
  extraStyle?: SystemStyleObject;
}

export interface IBaseIconProps {
  svgURI: string;
  iconSlug: string;
  size?: string;
  color?: string;

  // TODO: sx is deprecated here, but leave it around in case somewhere is using it
  sx?: any;
  extraStyle?: SystemStyleObject;
}

export default ({
  size = '24px',
  iconSlug,
  svgURI,
  sx,
  extraStyle = {},
  color,
}: IBaseIconProps) => {
  const svgDataURI = `url("${svgURI}")`;

  // When color is specified, since the svg likely does not contain a color,
  // we must use a "mask" to change the color dynamically
  // https://stackoverflow.com/a/46904983/3793499
  return (
    <Text
      className={`sg-icon-${iconSlug}`}
      sx={{
        ...(color
          ? {
              backgroundColor: color,
              WebkitMaskImage: svgDataURI,
              MaskImage: svgDataURI,
            }
          : { backgroundImage: svgDataURI }),
        backgroundRepeat: 'no-repeat',
        backgroundSize: size,
        minWidth: size,
        minHeight: size,
        ...sx,
        ...extraStyle,
      }}
    >
      &nbsp;
    </Text>
  );
};
