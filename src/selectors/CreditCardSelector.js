export const getExpYearInLength2String = (yearIn4DigitInt) => String(yearIn4DigitInt).slice(-2);

export const getExpMonthInLength2String = (monthInInt) => ("0" + String(monthInInt)).slice(-2);
