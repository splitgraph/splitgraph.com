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
}: IBaseIconProps) => {
  return (
    <Text
      className={`sg-icon-${iconSlug}`}
      sx={{
        backgroundImage: `url("${svgURI}")`,
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
