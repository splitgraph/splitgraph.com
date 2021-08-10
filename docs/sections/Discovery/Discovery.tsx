import React, { useState } from "react";
import Image from "next/image";
import { Element } from "react-scroll";
import DiscoveryContainer from "./Discovery.style";

export interface ITabsProps {}

const Discovery = () => {
  return (
    <DiscoveryContainer>
      <div>
        <Element name="DiscoveryRef">
          <div className="discovery-wrap">
            <div className="discovery-text">
              <div className="discovery-text__title">
                <div className="tab-icon">
                  <Image
                    src={"/static/icon-tab-related.svg"}
                    alt="logo-icon"
                    width={25}
                    height={40}
                  />
                </div>
                <h2>
                  Discovery, <strong>easy peasy</strong>
                </h2>
              </div>

              <div className="discovery-text__content">
                <p>
                  This is a critical layer for your non-technical team members.
                  This is the catalog where metadata and columns mean the
                  difference between a clean, up-to-date source of truth, and an
                  unreliable mess riddled with redundancy.
                </p>
              </div>
            </div>

            <div className="discovery-image">
              <Image
                src={"/static/img-illustration-temp.png"}
                alt="illustration"
                layout="responsive"
                width={1200}
                height={720}
                objectFit="cover"
              />
            </div>
          </div>
        </Element>
      </div>
    </DiscoveryContainer>
  );
};

export default Discovery;
