import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import StickyTabsContainer from "./StickyTabs.style";

export interface IStickyTabsProps {}

const tabsObj = [
  {
    name: "Integration",
    to: "1stRef",
  },
  {
    name: "Storage",
    to: "2ndRef",
  },
  {
    name: "Modelling",
    to: "3rdRef",
  },
  {
    name: "Discovery",
    to: "4thRef",
  },
  {
    name: "Access",
    to: "5thRef",
  },
];

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

  return (
    <StickyTabsContainer className={`${isSticky ? "is-sticky" : ""}`}>
      <ul>
        {tabsObj?.map((item, id) => (
          <li key={id}>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              duration={500}
              to={item.to}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </StickyTabsContainer>
  );
};

export default StickyTabs;
