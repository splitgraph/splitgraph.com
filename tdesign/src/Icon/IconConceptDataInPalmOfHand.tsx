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
