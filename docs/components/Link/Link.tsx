/** @jsxImportSource @emotion/react */
// @ts-ignore
import { jsx } from "theme-ui";
import * as React from "react";

import { useRouter } from "next/router";
import { Link, LinkProps, INextDynamicLinkProps } from "@splitgraph/tdesign";

import getLinkType from "@splitgraph/docs/compile/compiledGetLinkType";

interface RoutingProps extends Pick<LinkProps, "href" | "as"> {
  useHtmlLink?: boolean;
}

interface IGetRoutingPropsArgs {
  href: string | INextDynamicLinkProps;
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
      useHtmlLink: true,
      href: resolvedHref,
      as: resolvedHref,
    };
  }

  if (isContentLink) {
    return {
      useHtmlLink: false,
      as: resolvedHref,
      href: `/_content${resolvedHref}`,
    };
  } else if (isWebsiteLink) {
    return {
      useHtmlLink: false,
      as: resolvedHref,
      href: resolvedHref,
    };
  } else if (isCatalogLink) {
    return {
      useHtmlLink: false,
      as: resolvedHref,
      href: resolvedHref,
    };
  } else if (isExternalLink) {
    return {
      useHtmlLink: true,
      as: resolvedHref,
      href: resolvedHref,
    };
  } else {
    console.warn("Warning: unknown href");
    return {
      useHtmlLink: true,
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

  const { useHtmlLink, href: typedHref, ...routingProps } = React.useMemo(
    () =>
      rest.hasOwnProperty("as")
        ? { href, useHtmlLink: false }
        : getRoutingProps({ href, currentURL }),
    [href, currentURL, rest]
  );

  return useHtmlLink ? (
    <a href={typedHref as string} {...rest} {...routingProps} />
  ) : (
    <Link href={typedHref} {...rest} {...routingProps} />
  );
};
