import styled from "@emotion/styled";
import { rem, grid, container } from "@splitgraph/docs/utils/common";
import mediaQuery from "@splitgraph/docs/utils/breakpoints";

const HeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  padding: ${rem(8)};
  z-index: 1000;
  ${mediaQuery[1]} {
    padding-top: ${rem(16)};
    padding-bottom: ${rem(16)};
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${container};
    &-brand {
      width: ${rem(142)};
      ${mediaQuery[2]} {
        width: ${rem(170)};
      }
      a {
        display: grid;
        width: 100%;
      }
    }
    &-left {
      ${mediaQuery[2]} {
        display: grid;
        align-items: center;
        grid-template-columns: auto auto;
      }
      &__items {
        display: none;
        ${mediaQuery[2]} {
          display: grid;
          ${grid(1, 3, 32)};
          padding-left: ${rem(36)};
        }
        li {
          a {
            color: ${(props) => props.theme.grays.dark.gray29};
            transition: all 0.2s ease-in;
            &:hover,
            &:focus {
              text-decoration: underline;
              color: ${(props) => props.theme.grays.dark.grey24};
            }
          }
        }
      }
    }
    &-menu {
      &__login {
        display: none;
        ${mediaQuery[2]} {
          display: flex;
          align-items: center;
        }
        a:first-of-type {
          margin-right: ${rem(24)};
          color: ${(props) => props.theme.grays.dark.gray29};
          transition: all 0.2s ease-in;
          &:hover,
          &:focus {
            text-decoration: underline;
            color: ${(props) => props.theme.grays.dark.grey24};
          }
        }
      }
    }
  }
`;

export const MenuToggle = styled.button`
  padding: 0;
  outline: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.5625rem;
  line-height: 0.625rem;
  text-transform: uppercase;
  border: none;
  background: transparent;
  cursor: pointer;
  ${mediaQuery[2]} {
    display: none;
  }
  #hamburger-icon {
    width: ${rem(18)};
    height: ${rem(14)};
    position: relative;
    transform: rotate(0deg);
    transition: 0.4s ease-in-out;
    span {
      display: block;
      position: absolute;
      height: ${rem(2)};
      width: 100%;
      background: ${(props) => props.theme.grays.dark.gray29};
      border-radius: ${rem(4)};
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;
      &:nth-of-type(1) {
        top: 0px;
      }
      &:nth-of-type(2),
      &:nth-of-type(3) {
        top: ${rem(7)};
      }
      &:nth-of-type(4) {
        top: ${rem(14)};
      }
    }
    &.open {
      span {
        &:nth-of-type(1) {
          top: ${rem(5.5)};
          width: 0%;
          left: 50%;
        }
        &:nth-of-type(2) {
          transform: rotate(45deg);
        }
        &:nth-of-type(3) {
          transform: rotate(-45deg);
        }
        &:nth-of-type(4) {
          top: ${rem(5.5)};
          width: 0%;
          left: 50%;
        }
      }
    }
  }
`;

export default HeaderContainer;
