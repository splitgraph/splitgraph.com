import { css } from "@emotion/react";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

export const rem = (pixel: number) => {
  return `${pixel / 16}rem`;
};

export const grid = (
  mediumColumns: number = 1,
  largeColumns: number = 2,
  gap: number = 30
) => {
  return css`
    display: grid;
    gap: ${rem(gap)};

    ${mediaQuery[1]} {
      grid-template-columns: repeat(${mediumColumns}, 1fr);
    }
    ${mediaQuery[2]} {
      grid-template-columns: repeat(${largeColumns}, 1fr);
    }
  `;
};

export const container = () => {
  return css`
    max-width: ${rem(1366)};
    padding-left: ${rem(20)};
    padding-right: ${rem(20)};
    margin: 0 auto;

    ${mediaQuery[1]} {
      padding-left: ${rem(36)};
      padding-right: ${rem(36)};
    }
    ${mediaQuery[2]} {
      padding-left: ${rem(80)};
      padding-right: ${rem(80)};
    }
  `;
};
