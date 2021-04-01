/** @jsxImportSource theme-ui */
// @ts-ignore

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
