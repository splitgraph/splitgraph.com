import { css } from "@emotion/react";

export default css`
  :focus {
    outline: none;
  }

  a {
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  ul {
    list-style-type: none;
  }
`;
