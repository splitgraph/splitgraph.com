/** @jsxImportSource theme-ui */
// @ts-ignore

import { conceptMoneyDatabaseIconURI } from "./cssSvgStrings";
import BaseIcon, { IIconProps } from "./BaseIcon";

const IconConceptMoneyDatabase = (props: IIconProps) => {
  return (
    <BaseIcon
      iconSlug={"conceptMoneyDatabase"}
      svgURI={conceptMoneyDatabaseIconURI}
      {...props}
    />
  );
};

export default IconConceptMoneyDatabase;
