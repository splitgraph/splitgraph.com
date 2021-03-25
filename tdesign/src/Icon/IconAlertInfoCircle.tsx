/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";

import { alertInfoCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAlertInfoCircle = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"alertInfoCircle"}
      svgURI={alertInfoCircleIconURI}
      {...props}
    />
  );
};

export default IconAlertInfoCircle;
