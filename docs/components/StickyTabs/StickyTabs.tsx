import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [isSticky, setSticky] = useState(false);

  // const onMenuToggle = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  useEffect(() => {
    const handleScroll = () => {
      const startElement = document.getElementById("start-section");
      const offsetTop = startElement && startElement?.offsetTop;

      if (offsetTop === null) return;
      if (window.pageYOffset > offsetTop + 100) {
        setSticky(true);
      } else setSticky(false);
    };

    if (typeof window === `undefined`) return;
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRouter = (url) => {
    router.push(`/docs/lp#${url.toLowerCase()}`, undefined, { shallow: true });
  };

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
              offset={-100}
              to={item.to}
              onClick={() => handleRouter(item.name)}
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
