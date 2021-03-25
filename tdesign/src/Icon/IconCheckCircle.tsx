/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { checkCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCheckCircle = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"checkCircle"} svgURI={checkCircleIconURI} {...props} />
  );
};

export default IconCheckCircle;
