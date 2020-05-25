import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "today",
    past: "%s",
    s: "today",
    m: "today",
    mm: "today",
    h: "today",
    hh: "today",
    d: "yesterday",
    dd: "%d days ago",
    M: "a month ago",
    MM: "%d months ago",
    y: "a year ago",
    yy: "%d years ago",
  },
});

const formatDate = (date) => {
  return {
    value: dayjs(date).fromNow(),
    hoverValue: `Published on ${dayjs(date).format("MMMM D, YYYY")}`,
  };
};

export default formatDate;
