// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { featureExtractTransformTransformIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconFeatureExtractTransformTransform = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={'featureExtractTransformTransform'}
      svgURI={featureExtractTransformTransformIconURI}
      {...props}
    />
  );
};

export default IconFeatureExtractTransformTransform;
