// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { chevronLeftPrimaryColorIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconChevronLeftPrimaryColor = (props: IIconProps) => {
  return <BaseIcon iconSlug={'chevronLeftPrimaryColor'} svgURI={chevronLeftPrimaryColorIconURI} {...props} />;
};

export default IconChevronLeftPrimaryColor;

