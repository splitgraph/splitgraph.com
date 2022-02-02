import Router from "next/router";

// Adapted from https://github.com/SocialGouv/matomo-next

export function matomoInit({
  url,
  siteId,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
  shouldIgnoreURL = (_url: Location) => false,
}) {
  // Using absolute path makes URL() work when overriding sendBeacon
  const origin = window && window.location ? window.location.origin || "" : "";
  url = `${origin}${url}`;

  if (navigator.sendBeacon) {
    const origSendBeacon = navigator.sendBeacon;
    navigator.sendBeacon = function () {
      const cleanSearchParams = (origSearch) => {
        // We need to remove the leading `?` from the original search params,
        // since lua will insert it at the other end, and a double ?? makes Big Sad
        return `?q=${btoa(origSearch.substring(1))}`;
      };

      if (typeof arguments[0] === "string") {
        const _url = new URL(args[0]);
        _url.search = `${cleanSearchParams(_url.search)}`;
        arguments[0] = _url.toString();
      }

      return origSendBeacon.apply(this, arguments);
    };
  }
  // @ts-ignore next
  window._paq = window._paq || [];
  if (!url) {
    console.warn("Matomo disabled, please provide matomo url");
    return;
  }
  let previousPath = "";

  const maybePush = (matomoArgs) => {
    if (!window || shouldIgnoreURL(window.location)) {
      return;
    }

    return matomoPush(matomoArgs);
  };

  // order is important
  maybePush(["alwaysUseSendBeacon", true]);
  maybePush(["trackPageView"]);
  maybePush(["enableLinkTracking"]);
  maybePush(["setTrackerUrl", `${url}/${phpTrackerFile}`]);
  maybePush(["setSiteId", siteId]);

  // Maybe get the access token
  if (
    document &&
    document.cookie &&
    document.cookie.includes("sgr.token.access")
  ) {
    try {
      const userId = JSON.parse(
        atob(
          document.cookie
            .split("; sgr.token.access=")
            .pop()
            .split(";")
            .shift()
            .split(".")[1]
        )
      ).user_id;

      if (userId) {
        matomoSetUserId({ userId });
      }
    } catch (e) {
      console.warn("Error trying to parse user_id from access token:", e);
    }
  }

  // Use location.pathname on initial load, then Router.pathname on subsequent CSR requests
  const scriptElement = document.createElement("script");
  const refElement = document.getElementsByTagName("script")[0];
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;
  scriptElement.src = `${url}/${jsTrackerFile}`;
  refElement.parentNode.insertBefore(scriptElement, refElement);
  previousPath = location.pathname;

  Router.events.on("routeChangeComplete", (path) => {
    const [pathname] = path.split("?");

    setTimeout(() => {
      if (previousPath) {
        maybePush(["setReferrerUrl", `${previousPath}`]);
      }
      maybePush(["setCustomUrl", pathname]);
      maybePush(["setDocumentTitle", document.title]);
      maybePush(["deleteCustomVariables", "page"]);
      maybePush(["trackPageView"]);
      maybePush(["enableLinkTracking"]);
      previousPath = pathname;
    }, 0);
  });
}

export function matomoSetUserId({ userId }) {
  if (!window) {
    return;
  }

  if (!userId) {
    console.warn("Cannot set userId to non-existing ID");
    return;
  }

  matomoPush(["setUserId", userId]);
}

export function matomoTrack({ category, action, name, value }) {
  if (!window) {
    return;
  }

  if (!category || !action || !name) {
    console.warn("trackEvent missing category, action or name. Not pushing.");
    return;
  }

  matomoPush(["trackEvent", category, action, name, ...(value ? [value] : [])]);
}

export function matomoPush(args) {
  if (!window || !window._paq) {
    return;
  }

  window._paq.push(args);
}

interface MWindow extends Window {
  _paq: any;
}
declare let window: MWindow;
