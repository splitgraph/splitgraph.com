// @jsx jsx
// @ts-ignore
import { jsx, Text } from 'theme-ui';
import * as React from 'react';

import { keyIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

export default (props: IIconProps) => {
  return <BaseIcon iconSlug={'key'} svgURI={keyIconURI} {...props} />;
};
