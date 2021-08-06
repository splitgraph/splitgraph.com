import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const TextAndIconContainer = styled.div`
  .tab-icon {
    width: ${rem(25)};
    height: ${rem(40)};
    margin-bottom: ${rem(14)};
  }

  h3 {
    font-weight: 600;
    font-size: ${rem(24)};
    line-height: ${rem(32)};
    margin-bottom: ${rem(12)};
  }
  p {
    font-size: ${rem(16)};
    line-height: ${rem(24)};
  }
`;

export default TextAndIconContainer;
