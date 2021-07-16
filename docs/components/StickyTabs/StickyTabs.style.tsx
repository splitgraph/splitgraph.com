import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const StickyTabsContainer = styled.div`
  padding: ${rem(26)} 0;
  transition: all 0.25s cubic-bezier(0.8, 0, 0.2, 1);

  &.is-sticky {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${(props) => props.theme.surfaces.light.background};
  }

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
