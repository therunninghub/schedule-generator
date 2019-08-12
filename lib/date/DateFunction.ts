interface DateFunction {
  clone(): Date;

  addMilliseconds(number: number): Date;

  addSeconds(number: number): Date;

  addMinutes(number: number): Date;

  addHours(number: number): Date;

  addDates(number: number): Date;

  addWeeks(number: number): Date;
}

export default DateFunction;
