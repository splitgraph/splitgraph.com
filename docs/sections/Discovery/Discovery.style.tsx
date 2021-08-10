import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const DiscoveryContainer = styled.div`
  margin-top: ${rem(100)};
  ${mediaQuery[2]} {
    margin-top: ${rem(200)};
  }

  .discovery {
    &-wrap {
      ${container()};
    }

    &-text {
      ${mediaQuery[2]} {
        ${grid(1, 12)};
        align-items: flex-end;
        margin-bottom: ${rem(40)};
      }

      h2 {
        font-size: ${rem(40)};
        line-height: 1.2;
        color: ${(props) => props.theme.grays.light.gray21};
        margin-bottom: ${rem(35)};

        ${mediaQuery[2]} {
          margin-bottom: 0;
        }
      }

      p {
        font-size: ${rem(16)};
        line-height: 1.5;
        color: ${(props) => props.theme.grays.light.gray21};
        margin-bottom: ${rem(24)};
        ${mediaQuery[2]} {
          margin-bottom: 0;
        }
      }

      &__title {
        ${mediaQuery[2]} {
          grid-column: 2 / span 3;
        }
      }

      &__content {
        ${mediaQuery[2]} {
          grid-column: 5 / span 6;
        }
      }
    }

    &-image {
      box-shadow: 0 ${rem(6)} ${rem(15)} ${rem(-7)} rgba(0, 2, 2, 0.3);

      ${mediaQuery[1]} {
        box-shadow: 0 ${rem(23)} ${rem(66)} ${rem(-32)} rgba(0, 2, 2, 0.3);
      }
      ${mediaQuery[2]} {
      }
    }
  }
`;

export default DiscoveryContainer;
