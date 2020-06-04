import Router from "next/router";

// Adapted from https://github.com/SocialGouv/matomo-next

export function matomoInit({
  url,
  siteId,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
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

  // order is important
  matomoPush(["alwaysUseSendBeacon", true]);
  matomoPush(["trackPageView"]);
  matomoPush(["enableLinkTracking"]);
  matomoPush(["setTrackerUrl", `${url}/${phpTrackerFile}`]);
  matomoPush(["setSiteId", siteId]);

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
        matomoPush(["setReferrerUrl", `${previousPath}`]);
      }
      matomoPush(["setCustomUrl", pathname]);
      matomoPush(["setDocumentTitle", document.title]);
      matomoPush(["deleteCustomVariables", "page"]);
      matomoPush(["setGenerationTimeMs", 0]);
      matomoPush(["trackPageView"]);
      matomoPush(["enableLinkTracking"]);
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
