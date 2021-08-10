import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const AccessContainer = styled.div`
  ${container()};
  margin-top: ${rem(200)};
  ${mediaQuery[1]} {
    padding: 0;
  }
  ${mediaQuery[2]} {
    margin-top: ${rem(100)};
  }

  .access-section {
    &__title {
      text-align: center;
      margin-bottom: ${rem(48)};

      ${mediaQuery[2]} {
        margin-bottom: ${rem(62)};
      }

      h2 {
        font-size: ${rem(48)};
        line-height: 1.2;
        color: ${(props) => props.theme.grays.light.gray21};
        margin-bottom: ${rem(35)};

        ${mediaQuery[2]} {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default AccessContainer;
