// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { activityIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

export default (props: IIconProps) => {
  return <BaseIcon iconSlug={'activity'} svgURI={activityIconURI} {...props} />;
};

