import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const StickyTabsContainer = styled.div`
  padding: ${rem(26)} 0;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${container};
    ${mediaQuery[1]} {
    }

    li {
      padding: ${rem(12)} ${rem(14)};
      font-size: ${rem(20)};
    }
  }
`;

export default StickyTabsContainer;
