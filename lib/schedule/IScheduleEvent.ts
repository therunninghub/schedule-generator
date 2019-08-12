import ITime from "../time/ITime";

interface IScheduleEvent {
  readonly date: Date;
  readonly startTime: ITime;
  readonly endTime: ITime;
}

export default IScheduleEvent;
