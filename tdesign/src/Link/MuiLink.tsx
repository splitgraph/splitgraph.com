import { forwardRef, AnchorHTMLAttributes } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

import type { UrlObject } from "url";

type NextHref = string | UrlObject;
interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<NextLinkProps, "href"> {
  to: NextHref;
  href?: NextHref;

  // There seems to be some conflict with `as`. If we use it here, MUI breaks
  // when rendering with prop `component = { NextLinkComposed }`. Given the
  // term "as", it could be a failure at any number of places. This resolves it.
  nextAs?: NextHref;
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    href,
    replace,
    scroll,
    passHref,
    shallow,
    prefetch,
    locale,
    nextAs,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      as={nextAs}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
    >
      <a ref={ref} {...(other as any)} />
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  href: NextHref;
  noLinkStyle?: boolean;
  as?: NextHref;
} & Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const {
    activeClassName = "active",
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don't have roles.
    as,
    ...other
  } = props;

  const router = useRouter();

  const pathname =
    typeof as === "undefined"
      ? typeof href !== "undefined"
        ? typeof href === "string"
          ? href
          : href.pathname
        : ""
      : typeof as === "string"
      ? as
      : as.pathname;

  // Make sure to compare to router.asPath to match dynamic URL segments
  // e.g. when `router.pathname` is `/[namespace]`, `router.asPath` is `/miles`
  const isActive = router.asPath === pathname;

  const className = clsx(classNameProps, {
    [activeClassName]: isActive,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a
          className={className}
          href={href as string}
          ref={ref as any}
          {...(other as any)}
        />
      );
    }
    return (
      <MuiLink
        className={className}
        href={href as string}
        ref={ref}
        {...(other as any)}
      />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref as any}
        to={href}
        nextAs={as}
        {...(other as any)}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      to={href}
      nextAs={as}
      {...(other as any)}
    />
  );
});

export default Link;
