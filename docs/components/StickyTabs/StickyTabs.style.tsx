import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const StickyTabsContainer = styled.div`
  padding: ${rem(12)} 0;
  transition: all 0.25s cubic-bezier(0.8, 0, 0.2, 1);

  &.is-sticky {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${(props) => props.theme.surfaces.light.background};
    height: ${rem(100)};
    padding: 0;
    display: flex;
    align-items: center;

    ul {
      li {
        .tab-icon {
          display: none;
        }

        span {
          margin: 0;
        }
      }
    }
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

      a {
        span {
          display: block;
          padding: ${rem(10)} ${rem(16)};
          font-weight: 600;
          line-height: 1.2;
          font-size: ${rem(20)};
          margin-top: ${rem(8)};
          color: ${(props) => props.theme.grays.light.gray25};
          transition: all 0.25s cubic-bezier(0.8, 0, 0.2, 1);
          border: ${rem(1)} solid transparent;
        }

        &.active {
          span {
            border-radius: ${rem(4)};
            color: ${(props) => props.theme.grays.light.gray20};
            border-color: ${(props) => props.theme.grays.light.gray20};
          }
        }
      }
    }
  }
`;

export default StickyTabsContainer;
