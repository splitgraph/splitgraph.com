/** @jsxImportSource theme-ui */
// @ts-ignore

import { activityIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconActivity = (props: IIconProps) => {
  return <BaseIcon iconSlug={"activity"} svgURI={activityIconURI} {...props} />;
};

export default IconActivity;
