import { useState, useEffect } from "react";

const useHasSessionCookie = () => {
  const [hasSessionCookie, setHasSessionCookie] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    setHasSessionCookie(document.cookie.includes("sgr.session.id.v2"));
  }, []);

  return {
    hasSessionCookie,
  };
};

export default useHasSessionCookie;
