// @jsx jsx
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { useRouter } from "next/router";
import { Link, LinkProps } from "@splitgraph/tdesign";

import getLinkType from "@splitgraph/docs/compile/compiledGetLinkType";

interface RoutingProps extends Pick<LinkProps, "href" | "as"> {}

interface IGetRoutingPropsArgs {
  href: string;
  currentURL?: string;
}

const getRoutingProps = ({
  href,
  currentURL,
}: IGetRoutingPropsArgs): RoutingProps => {
  const {
    isWebsiteLink,
    isContentLink,
    isCatalogLink,
    resolvedHref,
    isExternalLink,
    isAnchorLink,
  } = getLinkType({ href, currentURL });

  if (isAnchorLink) {
    return {
      href: resolvedHref,
      as: resolvedHref,
    };
  }

  if (isContentLink) {
    return {
      as: resolvedHref,
      href: `/_content${resolvedHref}`,
    };
  } else if (isWebsiteLink) {
    return {
      as: resolvedHref,
      href: resolvedHref,
    };
  } else if (isCatalogLink) {
    return {
      as: resolvedHref,
      href: resolvedHref,
    };
  } else if (isExternalLink) {
    return {
      as: resolvedHref,
      href: resolvedHref,
    };
  } else {
    console.warn("Warning: unknown href");
    return {
      as: href,
      href: href,
    };
  }
};

export default ({ href, ...rest }: LinkProps) => {
  const router = useRouter();

  const currentURL = React.useMemo(
    () => (router ? router.pathname.replace(/^\/\_content/gm, "") : ""),
    [router]
  );

  const routingProps = React.useMemo(
    () =>
      rest.hasOwnProperty("as")
        ? { href }
        : getRoutingProps({ href, currentURL }),
    [href, currentURL, rest]
  );

  return <Link {...rest} {...routingProps} />;
};
