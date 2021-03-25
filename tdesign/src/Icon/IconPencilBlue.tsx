// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { pencilBlueIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconPencilBlue = (props: IIconProps) => {
  return <BaseIcon iconSlug={'pencilBlue'} svgURI={pencilBlueIconURI} {...props} />;
};

export default IconPencilBlue;

