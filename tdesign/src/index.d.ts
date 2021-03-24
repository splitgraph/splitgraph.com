/// <reference types="react" />
export declare const Thing: () => JSX.Element;

import { Theme } from "theme-ui"

export interface IDefaultTheme {
  colors?: any;
}

export declare const makeDefaultTheme: () => Theme;
