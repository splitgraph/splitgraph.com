// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { Link } from "@splitgraph/tdesign";

export interface IHeaderRightProps {}

export default ({}: IHeaderRightProps) => {
  return (
    <>
      <Link href="/docs/getting-started/introduction">Docs</Link>
    </>
  );
};
