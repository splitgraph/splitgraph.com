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
