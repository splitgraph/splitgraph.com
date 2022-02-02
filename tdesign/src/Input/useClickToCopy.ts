import { useState, useCallback, useEffect } from "react";

type CopyStatus = "inactive" | "copied" | "error";
const useClickToCopy = (
  text: string,
  timeout = 2000
): [CopyStatus, () => void] => {
  const [status, setStatus] = useState<CopyStatus>("inactive");
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setStatus("copied"),
      () => setStatus("error")
    );
  }, [text]);

  useEffect(() => {
    if (status === "inactive") {
      return;
    }

    const timeoutId = setTimeout(() => setStatus("inactive"), timeout);

    return () => clearTimeout(timeoutId);
    // NOTE: we deliberately do not want to reset the timeout when `timeout` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return [status, copy];
};
export default useClickToCopy;
