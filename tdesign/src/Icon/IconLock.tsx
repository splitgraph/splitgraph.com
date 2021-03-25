// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { lockIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconLock = (props: IIconProps) => {
  return <BaseIcon iconSlug={'lock'} svgURI={lockIconURI} {...props} />;
};

export default IconLock;

