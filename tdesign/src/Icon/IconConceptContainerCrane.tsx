/** @jsxImportSource theme-ui */
// @ts-ignore
import { jsx } from "theme-ui";

import { conceptContainerCraneIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconConceptContainerCrane = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"conceptContainerCrane"}
      svgURI={conceptContainerCraneIconURI}
      {...props}
    />
  );
};

export default IconConceptContainerCrane;
