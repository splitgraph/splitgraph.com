import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const TabsContainer = styled.div`
  .tab-section {
    height: 100vh;
    background-color: ${(props) => props.theme.grays.dark.grey24};

    h2 {
      color: ${(props) => props.theme.grays.dark.gray29};
    }
    p {
      color: ${(props) => props.theme.grays.dark.gray29};
    }

    &.black {
      background-color: ${(props) => props.theme.grays.dark.gray29};

      h2 {
        color: ${(props) => props.theme.surfaces.light.background};
      }
      p {
        color: ${(props) => props.theme.surfaces.light.background};
      }
    }
  }
`;

export default TabsContainer;
