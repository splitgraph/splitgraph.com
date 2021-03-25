// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { rssIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconRss = (props: IIconProps) => {
  return <BaseIcon iconSlug={'rss'} svgURI={rssIconURI} {...props} />;
};

export default IconRss;

