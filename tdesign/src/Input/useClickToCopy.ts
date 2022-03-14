import { useState, useCallback, useEffect } from "react";

type CopyStatus = "inactive" | "copied" | "error";
export const useClickToCopy = (timeout = 2000) => {
  const [status, setStatus] = useState<CopyStatus>("inactive");
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(
      () => setStatus("copied"),
      () => setStatus("error")
    );
  }, []);

  useEffect(() => {
    if (status === "inactive") {
      return;
    }

    const timeoutId = setTimeout(() => setStatus("inactive"), timeout);

    return () => clearTimeout(timeoutId);
    // NOTE: we deliberately do not want to reset the timeout when `timeout` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return [status, copy] as const;
};
