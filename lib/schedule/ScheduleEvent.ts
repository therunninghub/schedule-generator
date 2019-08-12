import IScheduleEvent from "./IScheduleEvent";
import ITime from "../time/ITime";

class ScheduleEvent implements IScheduleEvent {
  readonly date: Date;
  readonly endTime: ITime;
  readonly startTime: ITime;

  constructor(date: Date, startTime: ITime, endTime: ITime) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export default ScheduleEvent;
