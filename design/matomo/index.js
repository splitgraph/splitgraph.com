import Router from "next/router";

// Adapted from https://github.com/SocialGouv/matomo-next

export function matomoInit({
  url,
  siteId,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
  shouldIgnoreURL = (url) => false,
}) {
  // Using absolute path makes URL() work when overriding sendBeacon
  const origin = window && window.location ? window.location.origin || "" : "";
  url = `${origin}${url}`;

  if (navigator.sendBeacon) {
    var origSendBeacon = navigator.sendBeacon;
    navigator.sendBeacon = function() {
      if (typeof arguments[0] === "string") {
        var _url = new URL(arguments[0]);

        _url.search = `?q=${btoa(_url.search)}`;
        arguments[0] = _url.toString();
      }

      return origSendBeacon.apply(this, arguments);
    };
  }

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
      maybePush(["setGenerationTimeMs", 0]);
      maybePush(["trackPageView"]);
      maybePush(["enableLinkTracking"]);
      previousPath = pathname;
    }, 0);
  });
}

export function matomoPush(args) {
  if (!window || !window._paq) {
    return;
  }

  window._paq.push(args);
}
