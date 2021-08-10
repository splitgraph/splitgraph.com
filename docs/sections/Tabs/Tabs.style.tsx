import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const TabsContainer = styled.div`
  .black-shape {
    ${container()};
    background: ${(props) => props.theme.grays.light.gray20};

    &.top-radius {
      border-radius: ${rem(80)} ${rem(80)} 0 0;
    }
    &.bottom-radius {
      border-radius: 0 0 ${rem(80)} ${rem(80)};
    }

    h3 {
      color: ${(props) => props.theme.surfaces.light.background};
    }
    p {
      color: ${(props) => props.theme.grays.light.gray24};
    }
  }

  .white-shape {
    ${container()};
    background: ${(props) => props.theme.surfaces.light.background};

    h3 {
      color: ${(props) => props.theme.grays.light.gray21};
    }
    p {
      color: ${(props) => props.theme.grays.light.gray22};
    }
  }

  .vector-shape {
    ${container()};
    padding: 0;
    background: ${(props) => props.theme.grays.light.gray20};
    ${mediaQuery[1]} {
      padding: 0;
    }

    &.reverse {
      img {
        transform: scaleX(-1);
      }
    }

    &.rotate {
      img {
        transform: rotate(180deg);
      }
    }
  }

  .source-section {
    padding: ${rem(110)} 0 ${rem(140)};
    ${mediaQuery[2]} {
      ${grid(1, 12)};
      align-items: center;
    }

    &__text {
      ${mediaQuery[2]} {
        grid-column: 1 / span 5;
      }
    }

    &__image {
      position: relative;
      height: ${rem(375)};
      margin-top: ${rem(65)};
      ${mediaQuery[2]} {
        grid-column: 7 / span 6;
      }
    }
  }

  .storage-section {
    padding: ${rem(45)} 0 ${rem(140)};
    ${mediaQuery[2]} {
      ${grid(1, 2)};
      align-items: center;
    }

    &__left {
      &-image {
        position: relative;
        height: ${rem(220)};
        margin-top: ${rem(64)};
      }
    }

    &__right {
      padding: 0 ${rem(20)};
      margin-top: ${rem(70)};
      ${mediaQuery[2]} {
      }
    }
  }

  .model-section {
    padding: ${rem(110)} 0 ${rem(140)};
    ${mediaQuery[2]} {
      ${grid(1, 12)};
      align-items: center;
    }

    &__text {
      ${mediaQuery[2]} {
        grid-column: 1 / span 5;
      }
    }

    &__image {
      position: relative;
      height: ${rem(375)};
      margin-top: ${rem(65)};
      ${mediaQuery[2]} {
        grid-column: 7 / span 6;
      }
    }
  }
`;

export default TabsContainer;
