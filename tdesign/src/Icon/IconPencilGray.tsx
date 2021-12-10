import { pencilGrayIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPencilGray = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"pencilGray"}
      svgURI={pencilGrayIconURI}
      color="#818285"
      {...props}
    />
  );
};

export default IconPencilGray;
