import IFrequentOptions from "../builders/frequency/IFrequentOptions";
import IScheduleOption from "./IScheduleOption";
import ScheduleOption from "./ScheduleOption";
import Frequency from "../builders/frequency/Frequency";

class ScheduleOptionBuilder {
  private _startDate: Date;
  private _endDate: Date;
  private _frequentOptions: IFrequentOptions;

  static new(): ScheduleOptionBuilder {
    return new ScheduleOptionBuilder();
  }

  startDate(date: Date): ScheduleOptionBuilder {
    this._startDate = date;

    return this;
  }

  endDate(date: Date): ScheduleOptionBuilder {
    this._endDate = date;

    return this;
  }

  frequentOptions(options: IFrequentOptions): ScheduleOptionBuilder {
    this._frequentOptions = options;

    return this;
  }

  build(): IScheduleOption {
    this._validate();
    return new ScheduleOption(
      this._startDate,
      this._endDate,
      this._frequentOptions
    );
  }

  private _validate() {
    if (this._startDate.getTime() > this._endDate.getTime()) {
      throw new Error("The start date must be before the end date");
    }

    const frequency = this._frequentOptions.frequency;

    switch (frequency) {
      case Frequency.WEEKLY:
        const weekdays = this._frequentOptions.weekdays;
        if (
          !this._frequentOptions.weekdays.includes(this._startDate.getDay())
        ) {
          throw new Error(
            "The weekday of start date must be included in the weekday"
          );
        }
        if (!this._frequentOptions.weekdays.includes(this._endDate.getDay())) {
          throw new Error(
            "The weekday of end date must be included in the weekday"
          );
        }
        if (typeof this._frequentOptions.excludedDates !== "undefined") {
          const invalidExcludedDates = this._frequentOptions.excludedDates.filter(
            date =>
              date.getTime() < this._startDate.getTime() ||
              date.getTime() > this._endDate.getTime()
          );

          if (invalidExcludedDates.length > 0) {
            throw new Error(
              "The excluded dates must be between start date and end date"
            );
          }
        }
        break;
      default:
        break;
    }
  }
}

export default ScheduleOptionBuilder;
