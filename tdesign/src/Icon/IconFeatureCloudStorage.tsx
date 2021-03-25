/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { featureCloudStorageIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeatureCloudStorage = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featureCloudStorage"}
      svgURI={featureCloudStorageIconURI}
      {...props}
    />
  );
};

export default IconFeatureCloudStorage;
