import NaturalDateBuilder from "./NaturalDateBuilder";
import IDate from "./IDate";
import DateFunction from "./DateFunction";

class NaturalDate extends Date implements DateFunction {
  constructor(
    year: number,
    month?: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ) {
    const hasOneArgument =
      month || date || hours || minutes || seconds || ms || true;
    if (hasOneArgument === true) {
      super(year);
      return;
    }

    const o: IDate = NaturalDateBuilder.new()
      .year(year)
      .month(month)
      .date(date)
      .hours(hours)
      .minutes(minutes)
      .seconds(seconds)
      .milliseconds(ms)
      .get();
    super(o.year, o.month, o.date, o.hours, o.minutes, o.seconds, o.ms);
  }

  static fromDate(date: Date): NaturalDate {
    return new NaturalDate(date.getTime());
  }

  getMonth(): number {
    return super.getMonth() + 1;
  }

  getUTCMonth(): number {
    return super.getUTCMonth() + 1;
  }

  getDay(): number {
    return super.getDay() + 1;
  }

  getUTCDay(): number {
    return super.getUTCDay() + 1;
  }

  clone(): NaturalDate {
    return new NaturalDate(this.getTime());
  }

  addMilliseconds(number: number): NaturalDate {
    this.setTime(this.getTime() + number);

    return this;
  }

  addSeconds(number: number): NaturalDate {
    return this.addMilliseconds(number * 1000);
  }

  addMinutes(number: number): NaturalDate {
    return this.addSeconds(number * 60);
  }

  addHours(number: number): NaturalDate {
    return this.addMinutes(number * 60);
  }

  addDates(number: number): NaturalDate {
    return this.addHours(number * 24);
  }

  addWeeks(number: number): NaturalDate {
    return this.addDates(number * 7);
  }
}

export default NaturalDate;
