/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

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
