// @jsx jsx
// @ts-ignore
import { jsx, Text } from 'theme-ui';
import * as React from 'react';

export interface IIconProps {
  size?: string;
  sx?: any;
}

export interface IBaseIconProps {
  svgURI: string;
  iconSlug: string;
  size?: string;
  sx?: any;
}

export default ({ size = '24px', iconSlug, svgURI, sx }: IBaseIconProps) => {
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
      }}
    >
      &nbsp;
    </Text>
  );
};
