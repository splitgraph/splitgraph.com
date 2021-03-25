// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { threeDotsHorizontalIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconThreeDotsHorizontal = (props: IIconProps) => {
  return <BaseIcon iconSlug={'threeDotsHorizontal'} svgURI={threeDotsHorizontalIconURI} {...props} />;
};

export default IconThreeDotsHorizontal;

