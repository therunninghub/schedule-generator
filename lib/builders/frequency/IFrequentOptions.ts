import ITime from "../../time/ITime";

interface IFrequentOptions {
  readonly frequency: number;
  readonly period: number;
  readonly weekdays?: number[];
  readonly excludedDates: Date[];
  readonly startTime: ITime;
  readonly endTime: ITime;
}

export default IFrequentOptions;
