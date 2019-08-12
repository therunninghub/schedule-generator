import DateUtils from "./DateUtils";
import IDate from "./IDate";

class NaturalDateBuilder {
  private _year: number;
  private _month: number;
  private _date: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;
  private _milliseconds: number;

  private constructor() {}

  static new() {
    return new NaturalDateBuilder();
  }

  year(year: number): NaturalDateBuilder {
    this._year = year;
    return this;
  }

  month(month: number): NaturalDateBuilder {
    this._month = month;

    return this;
  }

  date(date: number = 0): NaturalDateBuilder {
    this._date = date;
    return this;
  }

  hours(hours: number = 0): NaturalDateBuilder {
    this._hours = hours;
    return this;
  }

  minutes(minutes: number = 0): NaturalDateBuilder {
    this._minutes = minutes;
    return this;
  }

  seconds(seconds: number = 0): NaturalDateBuilder {
    this._seconds = seconds;
    return this;
  }

  milliseconds(milliseconds: number = 0): NaturalDateBuilder {
    this._milliseconds = milliseconds;
    return this;
  }

  validate() {
    if (this._month < 1 || this._month > 12) {
      throw new Error("Only accept month from 1 to 12");
    }

    if (this._date < 1 || this._date > 31) {
      throw new Error("Only accept date from 1 to 31");
    }

    if (this._date === 29) {
      if (this._month === 2) {
        if (!DateUtils._isLeapYear(this._year)) {
          throw new Error(`Year ${this._year} is not a leap year`);
        }
      }
    }

    if (this._date === 30) {
      if (this._month === 2) {
        throw new Error(`February does not have 30th`);
      }
    }

    if (this._date === 31) {
      if (![1, 3, 5, 7, 8, 10, 12].includes(this._month)) {
        throw new Error(`The input month ${this._month} does not have 31st`);
      }
    }

    if (this._hours < 0 || this._hours > 23) {
      throw new Error("Only accept hour from 0 to 23");
    }

    if (this._minutes < 0 || this._minutes > 59) {
      throw new Error("Only accept minute from 0 to 59");
    }

    if (this._seconds < 0 || this._seconds > 59) {
      throw new Error("Only accept second from 0 to 59");
    }

    if (this._milliseconds < 0 || this._milliseconds > 999) {
      throw new Error("Only accept millisecond from 0 to 999");
    }

    return true;
  }

  get(): IDate {
    this.validate();

    return {
      year: this._year,
      month: this._month - 1,
      date: this._date || 1,
      hours: this._hours || 0,
      minutes: this._minutes || 0,
      seconds: this._seconds || 0,
      ms: this._milliseconds || 0
    };
  }
}

export default NaturalDateBuilder;
