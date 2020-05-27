// @jsx jsx
// @ts-ignore
import { jsx } from 'theme-ui';
import * as React from 'react';

import { featureIntegrateOtherDatabasesIconURI } from './cssSvgStrings';
import BaseIcon, { IIconProps } from './BaseIcon';

export default (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={'featureIntegrateOtherDatabases'}
      svgURI={featureIntegrateOtherDatabasesIconURI}
      {...props}
    />
  );
};
