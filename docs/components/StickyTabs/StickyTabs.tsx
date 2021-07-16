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
      const startElement = document.getElementById("start-section");
      const offsetTop = startElement && startElement?.offsetTop;

      if (offsetTop === null) return;
      if (window.pageYOffset > offsetTop + 60) {
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
    <StickyTabsContainer className={`${isSticky ? "is-sticky" : ""}`}>
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
