// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { threeDotsHorizontalIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

export default (props: IIconProps) => {
  return <BaseIcon iconSlug={'threeDotsHorizontal'} svgURI={threeDotsHorizontalIconURI} {...props} />;
};

