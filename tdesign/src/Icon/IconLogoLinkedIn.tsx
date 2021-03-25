// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { logoLinkedInIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconLogoLinkedIn = (props: IIconProps) => {
  return <BaseIcon iconSlug={'logoLinkedIn'} svgURI={logoLinkedInIconURI} {...props} />;
};

export default IconLogoLinkedIn;

