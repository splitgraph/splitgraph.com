import { ThemeUIStyleObject, ThemeUIStyleObject } from "theme-ui";

declare module "react" {
  // Without this, we get type errors when using sx prop on basic HTML elements
  // It's fixed in the next major version of theme-ui, so we can remove this when we upgrade
  interface HTMLAttributes<T> extends ThemeUIStyleObject {
    sx?: ThemeUIStyleObject;
  }
}

/// <reference types="next" />
/// <reference types="next/types/global" />
