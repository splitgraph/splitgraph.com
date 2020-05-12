// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { Link } from "../Link";

export interface IHeaderRightProps {}

export default ({}: IHeaderRightProps) => {
  return (
    <>
      <Link href="/docs/getting-started/introduction">Docs</Link>
      <Link className="button-link" href="/auth/sign_up">
        Sign Up
      </Link>
    </>
  );
};
