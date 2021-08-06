import React, { useState } from "react";
import Image from "next/image";
import FooterContainer from "./Footer.style";

export interface IFooterProps {}

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-top">
        <ul>
          <h6>Product</h6>
          <li>Home</li>
          <li>Explore Data</li>
          <li>Connect to DDN</li>
          <li>Sign In</li>
          <li>Sign Up</li>
        </ul>

        <ul>
          <h6>Support</h6>
          <li>Documentation</li>
          <li>FAQ</li>
          <li>Examples</li>
          <li>Integration</li>
          <li>Use Cases</li>
        </ul>

        <ul>
          <h6>Company</h6>
          <li>Blog</li>
          <li>Private Cloud Beta</li>
          <li>Team</li>
          <li>Contact</li>
          <li>Use Cases</li>
        </ul>

        <ul>
          <h6>Legal</h6>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="footer-bottom"></div>
    </FooterContainer>
  );
};

export default Footer;
