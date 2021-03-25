/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { featurePythonLogoIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconFeaturePythonLogo = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"featurePythonLogo"}
      svgURI={featurePythonLogoIconURI}
      {...props}
    />
  );
};

export default IconFeaturePythonLogo;
