import { DateTime } from "luxon";

export const isoToYYYYMMDD = (iso) => {
  return DateTime.fromISO(iso).setLocale("sg").toFormat("yyyy/LL/dd");
};
