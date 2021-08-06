import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Link as ScrollLink } from "react-scroll";
import StickyTabsContainer from "./StickyTabs.style";

export interface IStickyTabsProps {}

const tabsObj = [
  {
    name: "Integration",
    to: "IntegrationRef",
  },
  {
    name: "Storage",
    to: "StorageRef",
  },
  {
    name: "Modelling",
    to: "ModellingRef",
  },
  {
    name: "Discovery",
    to: "DiscoveryRef",
  },
  {
    name: "Access",
    to: "AccessRef",
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
            <ScrollLink
              activeClass="active"
              spy={true}
              smooth={true}
              duration={500}
              offset={-100}
              to={item.to}
              onClick={() => handleRouter(item.name)}
            >
              <div className="tab-icon">
                <Link href="/" passHref>
                  <a>
                    <Image
                      src={"/static/icon-tab-related.svg"}
                      alt="logo-icon"
                      layout="responsive"
                      width={140}
                      height={32}
                    />
                  </a>
                </Link>
              </div>
              <span>{item.name}</span>
            </ScrollLink>
          </li>
        ))}
      </ul>
    </StickyTabsContainer>
  );
};

export default StickyTabs;
