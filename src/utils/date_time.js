import { DateTime } from "luxon";

const isoToYYYYMMDD = (iso) => {
  return DateTime.fromISO(iso).setLocale("sg").toFormat("yyyy/LL/dd");
};
