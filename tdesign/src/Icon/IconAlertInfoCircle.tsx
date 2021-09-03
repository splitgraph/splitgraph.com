import { alertInfoCircleIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconAlertInfoCircle = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"alertInfoCircle"}
      svgURI={alertInfoCircleIconURI}
      {...props}
    />
  );
};

export default IconAlertInfoCircle;
