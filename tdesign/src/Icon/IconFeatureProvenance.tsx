// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { featureProvenanceIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconFeatureProvenance = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={'featureProvenance'}
      svgURI={featureProvenanceIconURI}
      {...props}
    />
  );
};

export default IconFeatureProvenance;
