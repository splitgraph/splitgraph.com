/** @jsxImportSource theme-ui */
// @ts-ignore

import { conceptCowIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconConceptCow = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"conceptCow"} svgURI={conceptCowIconURI} {...props} />
  );
};

export default IconConceptCow;
