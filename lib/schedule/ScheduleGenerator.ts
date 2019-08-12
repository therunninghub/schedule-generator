import IScheduleOption from "./IScheduleOption";
import ISchedule from "./ISchedule";
import Schedule from "./Schedule";
import ScheduleEvent from "./ScheduleEvent";
import Frequency from "../builders/frequency/Frequency";
import NaturalDate from "../date/NaturalDate";

class ScheduleGenerator {
  static generateSchedule(options: IScheduleOption): ISchedule {
    const scheduleEvents: ScheduleEvent[] = [];

    const frequency = options.frequentOptions.frequency;

    switch (frequency) {
      case Frequency.WEEKLY:
        const startDateWeekday = options.startDate.getDay();
        const period = options.frequentOptions.period;
        const validScheduleDate = date =>
          options.startDate <= date && date <= options.endDate;
        const scheduleDates: NaturalDate[] = [];
        let lastWeekDates = options.frequentOptions.weekdays.map(weekday =>
          options.startDate.clone().addDates(weekday - startDateWeekday)
        );
        scheduleDates.push(...lastWeekDates.filter(validScheduleDate));
        const stop =
          scheduleDates.filter(
            date => options.endDate.getTime() === date.getTime()
          ).length > 0;

        while (!stop) {
          lastWeekDates = lastWeekDates.map(date =>
            date.clone().addWeeks(period)
          );
          scheduleDates.push(...lastWeekDates.filter(validScheduleDate));

          const currentMaxDateTimestamp = Math.max.apply(
            Math,
            lastWeekDates.map(date => date.getTime())
          );
          const currentMaxDate = new NaturalDate(currentMaxDateTimestamp);

          if (currentMaxDate > options.endDate) {
            break;
          }
        }

        const excludedDates = options.frequentOptions.excludedDates;

        let filteredScheduleDates = scheduleDates;
        if (typeof excludedDates !== "undefined") {
          const scheduleDatesTimestamp = excludedDates.map(date =>
            date.getTime()
          );

          filteredScheduleDates = scheduleDates.filter(
            date => !scheduleDatesTimestamp.includes(date.getTime())
          );
        }

        scheduleEvents.push(
          ...filteredScheduleDates.map(date => {
            return new ScheduleEvent(
              date,
              options.frequentOptions.startTime,
              options.frequentOptions.endTime
            );
          })
        );
        break;
      default:
        break;
    }
    return new Schedule(options.startDate, options.endDate, scheduleEvents);
  }
}

export default ScheduleGenerator;
