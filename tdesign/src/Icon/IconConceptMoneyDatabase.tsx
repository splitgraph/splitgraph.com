/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

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
