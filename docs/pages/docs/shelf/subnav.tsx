// @ts-nocheck
// this file is a WIP intended to demo intersection observer in its own page

// safe to ignore/delete as needed
import * as React from "react";
import { useRef } from "react";
import { Paper } from "@material-ui/core";
import withMuiTheme from "@splitgraph/tdesign/src/themes/withMUITheme";
import { SubnavBar } from "@splitgraph/tdesign/src/SubnavBar";

const sections = [
  {
    displayName: "Users",
    slug: "users",
  },
  {
    displayName: "Linked Accounts",
    slug: "linked-accounts",
  },
  {
    displayName: "Delete Account",
    slug: "delete-account",
  },
];

const SubnavDemo = () => {
  return (
    <Paper sx={{ m: "1rem", p: "1rem" }}>
      <SubnavBar title="Settings" sections={sections} />
      <Section key="1">div n°1</Section>
      <Section key="2">div n°2</Section>
      <Section key="3">div n°3</Section>
      <Section key="4">div n°4</Section>
      <Section key="5">div n°5</Section>
    </Paper>
  );
};

export default withMuiTheme(SubnavDemo);

const Section = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  console.log(`Render Section ${children?.toString()}`, { isVisible });

  return (
    <div
      ref={ref}
      style={{
        minHeight: "50vh",
        display: "flex",
        border: "1px dashed #000",
      }}
    >
      <div style={{ margin: "auto" }}>{children}</div>
    </div>
  );
};

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: Args
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  React.useEffect(() => {
    const node = elementRef?.current;
    const supportsIntObs = !!window.IntersectionObserver;

    if (!supportsIntObs || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
};
