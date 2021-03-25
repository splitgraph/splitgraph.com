// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { conceptDataInPalmOfHandIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

const IconConceptDataInPalmOfHand = (props: IIconProps) => {
  return <BaseIcon iconSlug={'conceptDataInPalmOfHand'} svgURI={conceptDataInPalmOfHandIconURI} {...props} />;
};

export default IconConceptDataInPalmOfHand;

