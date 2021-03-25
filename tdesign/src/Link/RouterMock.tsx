/** @jsxRuntime classic */
/** @jsx jsx */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { RouterContext } from "next/dist/next-server/lib/router-context";
// import { action } from '@storybook/addon-actions'
// import PropTypes from 'prop-types'
import { useState } from "react";
import Router from "next/router";

export interface IRouterMockProps {
  children: React.ReactNode;
}

const RouterMock = ({ children }: IRouterMockProps) => {
  const [pathname, setPathname] = useState("/");

  const mockRouter = {
    pathname,
    prefetch: async () => {},
    push: async (newPathname: string) => {
      // TODO: use storybook actions
      console.warn("Clicked link:", newPathname);
      setPathname(newPathname);

      return true;
    },
  };

  // @ts-ignore
  Router.router = mockRouter;

  return (
    // @ts-ignore
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterMock;
