/** @jsxImportSource theme-ui */
// @ts-ignore

import { postgresLogoIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconPostgresLogo = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"postgresLogo"}
      svgURI={postgresLogoIconURI}
      {...props}
    />
  );
};

export default IconPostgresLogo;
