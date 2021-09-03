import { sqlCredIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconSQLCred = (props: IIconProps) => {
  return <BaseIcon iconSlug={"sqlCred"} svgURI={sqlCredIconURI} {...props} />;
};

export default IconSQLCred;
