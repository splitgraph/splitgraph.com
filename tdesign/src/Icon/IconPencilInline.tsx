import { pencilIconInlineURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPencilInline = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"pencilInline"}
      svgURI={pencilIconInlineURI}
      {...props}
    />
  );
};

export default IconPencilInline;
