// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { logoHackerNewsIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconLogoHackerNews = (props: IIconProps) => {
  return <BaseIcon iconSlug={'logoHackerNews'} svgURI={logoHackerNewsIconURI} {...props} />;
};

export default IconLogoHackerNews;

