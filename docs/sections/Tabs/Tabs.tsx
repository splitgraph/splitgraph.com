import React, { useState } from "react";
import { Element } from "react-scroll";
import StickyTabs from "@splitgraph/docs/components/StickyTabs/StickyTabs";
import TabsContainer from "./Tabs.style";

export interface ITabsProps {}

const Tabs = () => {
  // const [isMenuOpen, setMenuOpen] = useState(false);

  // const onMenuToggle = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  return (
    <TabsContainer>
      <StickyTabs />
      <Element name="IntegrationRef">
        <div className="tab-section black" id="start-section">
          <h2>Integration</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
      <Element name="StorageRef">
        <div className="tab-section">
          <h2>Storage</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
      <Element name="ModellingRef">
        <div className="tab-section black">
          <h2>Modelling</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
      <Element name="DiscoveryRef">
        <div className="tab-section">
          <h2>Discovery</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
      <Element name="AccessRef">
        <div className="tab-section black">
          <h2>Access</h2>
          <p>
            This is where data enters the stack, and it's where problems with
            the stack originate. An out-of-control pipeline leads to surprise
            bandwidth bills from ASW. On top of that, you have to worry about
            missing and out-of-sink data.
          </p>
        </div>
      </Element>
    </TabsContainer>
  );
};

export default Tabs;
