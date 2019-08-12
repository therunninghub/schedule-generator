import IScheduleOption from "./IScheduleOption";
import IFrequentOptions from "../builders/frequency/IFrequentOptions";
import NaturalDate from "../date/NaturalDate";

class ScheduleOption implements IScheduleOption {
  readonly endDate: NaturalDate;
  readonly frequentOptions: IFrequentOptions;
  readonly startDate: NaturalDate;

  constructor(
    startDate: NaturalDate | Date,
    endDate: NaturalDate | Date,
    frequentOptions: IFrequentOptions
  ) {
    this.startDate =
      startDate instanceof Date ? NaturalDate.fromDate(startDate) : startDate;
    this.endDate =
      endDate instanceof Date ? NaturalDate.fromDate(endDate) : endDate;
    this.frequentOptions = frequentOptions;
  }
}

export default ScheduleOption;
