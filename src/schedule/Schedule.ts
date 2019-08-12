import ISchedule from "./ISchedule";
import IScheduleEvent from "./IScheduleEvent";

class Schedule implements ISchedule {
  readonly endDate: Date;
  readonly startDate: Date;
  readonly scheduleEvents: IScheduleEvent[];

  constructor(
    startDate: Date,
    endDate: Date,
    scheduleEvents: IScheduleEvent[]
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.scheduleEvents = scheduleEvents;
  }
}

export default Schedule;
