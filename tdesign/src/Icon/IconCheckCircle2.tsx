import { checkCircleIcon2URI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconCheckCircle2 = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"checkCircle2"}
      svgURI={checkCircleIcon2URI}
      {...props}
    />
  );
};

export default IconCheckCircle2;
