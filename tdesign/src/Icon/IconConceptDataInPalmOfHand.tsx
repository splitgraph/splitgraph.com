/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { conceptDataInPalmOfHandIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconConceptDataInPalmOfHand = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"conceptDataInPalmOfHand"}
      svgURI={conceptDataInPalmOfHandIconURI}
      {...props}
    />
  );
};

export default IconConceptDataInPalmOfHand;
