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
    padding-left: ${rem(16)};
    padding-right: ${rem(16)};
    margin: 0 auto;

    ${mediaQuery[2]} {
      padding-left: ${rem(24)};
      padding-right: ${rem(24)};
    }
  `;
};
