/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { alertTriangleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAlertTriangle = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"alertTriangle"}
      svgURI={alertTriangleIconURI}
      {...props}
    />
  );
};

export default IconAlertTriangle;
