// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { conceptWorkflowGantChartIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

export default (props: IIconProps) => {
  return <BaseIcon iconSlug={'conceptWorkflowGantChart'} svgURI={conceptWorkflowGantChartIconURI} {...props} />;
};

