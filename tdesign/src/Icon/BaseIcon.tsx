// @jsx jsx
// @ts-ignore
import { jsx, Text } from 'theme-ui';
import * as React from 'react';

export interface IIconProps {
  sx?: any;
}

export interface IBaseIconProps {
  svgURI: string;
  iconSlug: string;
  sx?: any;
}

export default ({ iconSlug, svgURI, sx }: IBaseIconProps) => {
  return (
    <Text
      className={`sg-icon-${iconSlug}`}
      sx={{
        backgroundImage: `url("${svgURI}")`,
        backgroundRepeat: 'no-repeat',
        minWidth: '24px',
        minHeight: '24px',
        ...sx,
      }}
    >
      &nbsp;
    </Text>
  );
};
