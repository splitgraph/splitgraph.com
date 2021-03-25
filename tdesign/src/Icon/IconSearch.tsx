// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { searchIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconSearch = (props: IIconProps) => {
  return <BaseIcon iconSlug={'search'} svgURI={searchIconURI} {...props} />;
};

export default IconSearch;

