const breakpoints = [480, 768, 1025, 1280, 1440, 1920];

const mediaQuery = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
export const maxMediaQuery = breakpoints.map(
  (bp) => `@media (max-width: ${bp}px)`
);

export default mediaQuery;
