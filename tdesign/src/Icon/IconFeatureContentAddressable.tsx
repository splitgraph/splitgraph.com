// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { featureContentAddressableIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconFeatureContentAddressable = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={'featureContentAddressable'}
      svgURI={featureContentAddressableIconURI}
      {...props}
    />
  );
};

export default IconFeatureContentAddressable;
