import ScheduleGenerator from "../lib/schedule/ScheduleGenerator";
import Frequency from "../lib/builders/frequency/Frequency";
import FrequencyBuilder from "../lib/builders/frequency/FrequencyBuilder";
import Weekdays from "../lib/builders/frequency/Weekdays";
import ScheduleOptionBuilder from "../lib/schedule/ScheduleOptionBuilder";
import ISchedule from "../lib/schedule/ISchedule";
import IScheduleOption from "../lib/schedule/IScheduleOption";
import ScheduleEvent from "../lib/schedule/ScheduleEvent";
import NaturalDate from "../lib/date/NaturalDate";
import "jest-extended";

test("Test the start date after the end date", () => {
  expect(() => {
    ScheduleOptionBuilder.new()
      .startDate(new NaturalDate(2019, 8, 2))
      .endDate(new NaturalDate(2019, 8, 1))
      .build();
  }).toThrow("The start date must be before the end date");
});

test("Test simple weekly schedule generation", () => {
  const scheduleOptions: IScheduleOption = ScheduleOptionBuilder.new()
    .startDate(new NaturalDate(2019, 8, 5))
    .endDate(new NaturalDate(2019, 8, 9))
    .frequentOptions(
      FrequencyBuilder.frequency(Frequency.WEEKLY)
        .period(1)
        .weekdays(Weekdays.MON_WEB_FRI)
        .startTime(19, 30)
        .endTime(21, 30)
        .build()
    )
    .build();

  const schedule: ISchedule = ScheduleGenerator.generateSchedule(
    scheduleOptions
  );

  expect(schedule.startDate).toEqual(new NaturalDate(2019, 8, 5));
  expect(schedule.endDate).toEqual(new NaturalDate(2019, 8, 9));
  expect(schedule.scheduleEvents).toIncludeSameMembers([
    new ScheduleEvent(
      new NaturalDate(2019, 8, 5),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 7),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 9),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    )
  ]);
});

test("Test weekly schedule generation with start date is not the first weekday in the weekday list", () => {
  const scheduleOptions: IScheduleOption = ScheduleOptionBuilder.new()
    .startDate(new NaturalDate(2019, 8, 7))
    .endDate(new NaturalDate(2019, 8, 12))
    .frequentOptions(
      FrequencyBuilder.frequency(Frequency.WEEKLY)
        .period(1)
        .weekdays(Weekdays.MON_WEB_FRI)
        .startTime(19, 30)
        .endTime(21, 30)
        .build()
    )
    .build();

  const schedule: ISchedule = ScheduleGenerator.generateSchedule(
    scheduleOptions
  );

  expect(schedule.startDate).toEqual(new NaturalDate(2019, 8, 7));
  expect(schedule.endDate).toEqual(new NaturalDate(2019, 8, 12));
  expect(schedule.scheduleEvents).toIncludeSameMembers([
    new ScheduleEvent(
      new NaturalDate(2019, 8, 7),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 9),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 12),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    )
  ]);
});

test("Test weekly schedule generation with custom period", () => {
  const scheduleOptions: IScheduleOption = ScheduleOptionBuilder.new()
    .startDate(new NaturalDate(2019, 8, 5))
    .endDate(new NaturalDate(2019, 9, 6))
    .frequentOptions(
      FrequencyBuilder.frequency(Frequency.WEEKLY)
        .period(2)
        .weekdays(Weekdays.MON_WEB_FRI)
        .startTime(19, 30)
        .endTime(21, 30)
        .build()
    )
    .build();

  const schedule: ISchedule = ScheduleGenerator.generateSchedule(
    scheduleOptions
  );

  expect(schedule.startDate).toEqual(new NaturalDate(2019, 8, 5));
  expect(schedule.endDate).toEqual(new NaturalDate(2019, 9, 6));
  expect(schedule.scheduleEvents).toIncludeSameMembers([
    new ScheduleEvent(
      new NaturalDate(2019, 8, 5),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 7),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 9),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 19),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 21),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 23),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 9, 2),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 9, 4),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 9, 6),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    )
  ]);
});

test("Test weekly schedule generation with invalid excluded dates", () => {
  expect(() => {
    ScheduleOptionBuilder.new()
      .startDate(new NaturalDate(2019, 8, 5))
      .endDate(new NaturalDate(2019, 9, 6))
      .frequentOptions(
        FrequencyBuilder.frequency(Frequency.WEEKLY)
          .period(2)
          .weekdays(Weekdays.MON_WEB_FRI)
          .excludeDates([new NaturalDate(2019, 8, 2)])
          .startTime(19, 30)
          .endTime(21, 30)
          .build()
      )
      .build();
  }).toThrow("The excluded dates must be between start date and end date");
});

test("Test weekly schedule generation with excluded dates", () => {
  const scheduleOptions: IScheduleOption = ScheduleOptionBuilder.new()
    .startDate(new NaturalDate(2019, 8, 5))
    .endDate(new NaturalDate(2019, 9, 6))
    .frequentOptions(
      FrequencyBuilder.frequency(Frequency.WEEKLY)
        .period(2)
        .weekdays(Weekdays.MON_WEB_FRI)
        .excludeDates([new NaturalDate(2019, 9, 2)])
        .startTime(19, 30)
        .endTime(21, 30)
        .build()
    )
    .build();

  const schedule: ISchedule = ScheduleGenerator.generateSchedule(
    scheduleOptions
  );

  expect(schedule.startDate).toEqual(new NaturalDate(2019, 8, 5));
  expect(schedule.endDate).toEqual(new NaturalDate(2019, 9, 6));
  expect(schedule.scheduleEvents).toIncludeSameMembers([
    new ScheduleEvent(
      new NaturalDate(2019, 8, 5),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 7),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 9),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 19),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 21),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 8, 23),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 9, 4),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    ),
    new ScheduleEvent(
      new NaturalDate(2019, 9, 6),
      { hours: 19, minutes: 30 },
      { hours: 21, minutes: 30 }
    )
  ]);
});
