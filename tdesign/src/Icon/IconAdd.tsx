import { eraseIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

export const IconAdd = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"add"}
      svgURI={eraseIconURI}
      extraStyle={{ transform: "rotate(45deg)" }}
      {...props}
    />
  );
};
