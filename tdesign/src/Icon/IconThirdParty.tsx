import { thirdPartyIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconThirdParty = (props: IIconProps) => {
  return (
    <BaseIcon iconSlug={"thirdParty"} svgURI={thirdPartyIconURI} {...props} />
  );
};

export default IconThirdParty;
