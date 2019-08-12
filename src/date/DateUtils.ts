class DateUtils {
  static _isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}

export default DateUtils;
