import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const FooterContainer = styled.div`
  .footer-top {
  }

  .footer-bottom {
    background: linear-gradient(
        0deg,
        rgba(249, 69, 105, 0.08),
        rgba(249, 69, 105, 0.08)
      ),
      #000202;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
`;

export default FooterContainer;
