// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { hamburgerIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconHamburger = (props: IIconProps) => {
  return <BaseIcon iconSlug={'hamburger'} svgURI={hamburgerIconURI} {...props} />;
};

export default IconHamburger;

