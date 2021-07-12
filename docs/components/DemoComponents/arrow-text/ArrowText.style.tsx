//@ts-nocheck
import styled from "@emotion/styled";
const rem = (pixel: number) => {
  return `${pixel / 16}rem`;
};

const ArrowTextContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${rem(2)};
  padding: ${rem(4)} ${rem(8)};
  border: ${rem(1)} solid;

  &.primary {
    border-image: linear-gradient(
        to right,
        transparent,
        rgba(249, 69, 105, 0.4)
      )
      1 stretch;

    color: ${(props) => {
      console.log(">>>", props);
      return props.theme.primary.main;
    }};
  }

  &.secondary {
    border-image: linear-gradient(
        to right,
        transparent,
        rgba(83, 183, 166, 0.4)
      )
      1 stretch;

    color: ${(props) => props.theme.primary.main};
  }

  &.success {
    border-image: linear-gradient(
        to right,
        transparent,
        rgba(67, 118, 108, 0.4)
      )
      1 stretch;

    color: ${(props) => props.theme.primary.main};
  }

  h6 {
    margin-right: ${rem(12)};
  }

  .icon {
    transition: all 0.25s cubic-bezier(0.8, 0, 0.2, 1);
  }

  &:hover,
  &:active {
    .icon {
      transform: translateX(${rem(4)});
    }
  }
`;

export default ArrowTextContainer;
