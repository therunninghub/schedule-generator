import IFrequentOptions from "../builders/frequency/IFrequentOptions";
import NaturalDate from "../date/NaturalDate";

interface IScheduleOption {
  readonly startDate: NaturalDate;
  readonly endDate: NaturalDate;
  readonly frequentOptions: IFrequentOptions;
}

export default IScheduleOption;
