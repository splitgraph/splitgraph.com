import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const ShapeContainer = styled.div`
  .black-shape {
    height: ${rem(400)};
    background: ${(props) => props.theme.surfaces.light.gradient};

    &.top-radius {
      border-radius: ${rem(80)} ${rem(80)} 0 0;
    }
    &.bottom-radius {
      border-radius: 0 0 ${rem(80)} ${rem(80)};
    }
  }

  .white-shape {
    height: ${rem(600)};
    background: ${(props) => props.theme.surfaces.light.background};
  }

  .vector-shape {
    background: ${(props) => props.theme.surfaces.light.gradient};

    &.reverse {
      img {
        transform: rotate(180deg) scaleX(-1);
      }
    }
  }
`;

export default ShapeContainer;
