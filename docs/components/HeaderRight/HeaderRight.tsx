// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { Link } from "../Link";

export interface IHeaderRightProps {}

export default ({}: IHeaderRightProps) => {
  return (
    <>
      <Link href="/blog">Blog</Link>
      <Link href="/docs">Docs</Link>
      <Link className="button-link--outline desktop-only" href="/connect">
        Connect
      </Link>
      <Link className="button-link" href="/explore">
        Data
      </Link>
    </>
  );
};
