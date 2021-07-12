import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@splitgraph/docs/components/Common";
import HeaderContainer, { MenuToggle } from "./Header.style";

export interface IHeaderProps {}

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <div className="nav">
        <div className="nav-left">
          <div className="nav-brand">
            <Link href="/" passHref>
              <a>
                <Image
                  src={"/images/logo.svg"}
                  alt="logo-icon"
                  layout="responsive"
                  width={140}
                  height={32}
                />
              </a>
            </Link>
          </div>

          <ul className="nav-left__items">
            <li>
              <Link href="/" passHref>
                <a>Why</a>
              </Link>
            </li>

            <li>
              <Link href="/" passHref>
                <a>Why</a>
              </Link>
            </li>

            <li>
              <Link href="/" passHref>
                <a>Why</a>
              </Link>
            </li>

            <li>
              <Link href="/" passHref>
                <a>Why</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-menu">
          <MenuToggle onClick={onMenuToggle} aria-label="menu open button">
            <div id="hamburger-icon" className={isMenuOpen ? "open" : ""}>
              <span />
              <span />
              <span />
              <span />
            </div>
          </MenuToggle>

          <div className="nav-menu__login">
            <Link href="/" passHref>
              <a>
                <h6>Sign in</h6>
              </a>
            </Link>

            <Link href="/" passHref>
              <a>
                <Button>Get Started - FREE</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
