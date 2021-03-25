// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { checkIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconCheck = (props: IIconProps) => {
  return <BaseIcon iconSlug={'check'} svgURI={checkIconURI} {...props} />;
};

export default IconCheck;

