import Frequency from "./Frequency";
import IFrequentOptions from "./IFrequentOptions";
import Time from "../../time/Time";

class FrequencyBuilder {
  private readonly _frequency: number;
  private _period: number;
  private _weekdays?: number[];
  private _excludedDates: Date[];
  private _startTime: Time;
  private _endTime: Time;

  private constructor(frequency: number) {
    this._frequency = frequency;
  }

  static frequency(frequency: number): FrequencyBuilder {
    return new FrequencyBuilder(frequency);
  }

  period(period: number): FrequencyBuilder {
    this._period = period;

    return this;
  }

  weekdays(weekdays: number[]): FrequencyBuilder {
    this._weekdays = weekdays;

    return this;
  }

  excludeDates(excludedDates: Date[]): FrequencyBuilder {
    this._excludedDates = excludedDates;

    return this;
  }

  startTime(hours: number, minutes: number): FrequencyBuilder {
    this._startTime = new Time(hours, minutes);

    return this;
  }

  endTime(hours: number, minutes: number): FrequencyBuilder {
    this._endTime = new Time(hours, minutes);

    return this;
  }

  build(): IFrequentOptions {
    this._validate();
    return {
      frequency: this._frequency,
      period: this._period,
      weekdays: this._weekdays,
      excludedDates: this._excludedDates,
      startTime: this._startTime,
      endTime: this._endTime
    };
  }

  private _validate() {
    if (!Object.values(Frequency).includes(this._frequency)) {
      throw new Error("Invalid frequency");
    }

    if (this._period < 1) {
      throw new Error("Period must greater than or equal to 1");
    }

    if (Frequency.WEEKLY === this._frequency && this._weekdays.length < 1) {
      throw new Error("You must provide weekdays");
    }
  }
}

export default FrequencyBuilder;
