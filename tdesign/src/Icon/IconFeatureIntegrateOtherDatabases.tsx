/** @jsxImportSource theme-ui */
// @ts-ignore

import { featureIntegrateOtherDatabasesIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureIntegrateOtherDatabases = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureIntegrateOtherDatabases"}
      svgURI={featureIntegrateOtherDatabasesIconURI}
      {...props}
    />
  );
};

export default IconFeatureIntegrateOtherDatabases;
