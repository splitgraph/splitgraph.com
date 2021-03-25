// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { chevronsDownIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconChevronsDown = (props: IIconProps) => {
  return <BaseIcon iconSlug={'chevronsDown'} svgURI={chevronsDownIconURI} {...props} />;
};

export default IconChevronsDown;

