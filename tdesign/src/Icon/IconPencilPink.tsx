import { pencilIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPencilPink = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"pencilPink"}
      svgURI={pencilIconURI}
      color="#F94569"
      {...props}
    />
  );
};

export default IconPencilPink;
