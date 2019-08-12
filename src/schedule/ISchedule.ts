import IScheduleEvent from "./IScheduleEvent";

interface ISchedule {
  readonly endDate: Date;
  readonly startDate: Date;
  readonly scheduleEvents: IScheduleEvent[];
}

export default ISchedule;
