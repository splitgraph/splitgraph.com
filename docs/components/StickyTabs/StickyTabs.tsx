import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import StickyTabsContainer from "./StickyTabs.style";

export interface IStickyTabsProps {}

const StickyTabs = () => {
  const [isSticky, setSticky] = useState(false);

  // const onMenuToggle = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  useEffect(() => {
    const handleScroll = () => {
      const contactElement = document.getElementById("start-section");
      const offsetTop = contactElement && contactElement.offsetTop;
      const offsetHeight = contactElement && contactElement.offsetHeight;

      if (offsetTop === null) return;
      if (window.pageYOffset > offsetTop) {
        setSticky(true);
      } else setSticky(false);
    };

    if (typeof window === `undefined`) return;
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(isSticky);

  return (
    <StickyTabsContainer>
      <ul>
        <li>Integration</li>
        <li>Storage</li>
        <li>Modelling</li>
        <li>Discovery</li>
        <li>Access</li>
      </ul>
    </StickyTabsContainer>
  );
};

export default StickyTabs;
