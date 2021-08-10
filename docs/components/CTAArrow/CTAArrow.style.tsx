import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const CTAArrowContainer = styled.div`
  a {
    display: inline-flex;

    span {
      font-weight: 600;
      font-size: ${rem(14)};
      line-height: ${rem(24)};
    }
    .arrow-icon {
      margin-left: ${rem(10)};
    }
  }
`;

export default CTAArrowContainer;
