import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const ImageAndTextContainer = styled.div`
  .image-text-col {
    ${mediaQuery[1]} {
      display: flex;
      align-items: center;
    }

    &.left {
      ${mediaQuery[1]} {
        flex-direction: row-reverse;
      }
    }

    a {
      color: ${(props) => props.theme.surfaces.light.link};
    }

    &__text {
      margin-bottom: ${rem(60)};
      ${mediaQuery[1]} {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      &-wrap {
        display: inline-block;

        ${mediaQuery[1]} {
          margin: 0 auto;
          max-width: ${rem(340)};
        }
        ${mediaQuery[2]} {
          max-width: ${rem(420)};
        }
      }

      h3 {
        font-weight: 700;
        font-size: ${rem(24)};
        line-height: 1.2;
        color: ${(props) => props.theme.grays.light.gray21};
        margin-bottom: ${rem(8)};

        ${mediaQuery[2]} {
          font-size: ${rem(40)};
        }
      }

      p {
        font-size: ${rem(14)};
        line-height: ${rem(24)};
        ${mediaQuery[2]} {
          font-size: ${rem(18)};
          margin-bottom: ${rem(12)};
        }
      }
    }

    &__image {
      flex: 1;
    }
  }
`;

export default ImageAndTextContainer;
