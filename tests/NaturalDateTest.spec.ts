import "jest-extended";
import NaturalDate from "../src/date/NaturalDate";

test("Construct simple date", () => {
  const date = new NaturalDate(2019, 1, 1);

  expect(date).toBeInstanceOf(Date);
  expect(date.getFullYear()).toBe(2019);
  expect(date.getMonth()).toBe(1);
  expect(date.getDate()).toBe(1);
});

test("Construct simple date in a leap year", () => {
  const date = new NaturalDate(2000, 2, 29);

  expect(date).toBeInstanceOf(Date);
  expect(date.getFullYear()).toBe(2000);
  expect(date.getMonth()).toBe(2);
  expect(date.getDate()).toBe(29);
});

test("Construct simple date with invalid date", () => {
  expect(() => new NaturalDate(2019, 8, 32)).toThrow(
    "Only accept date from 1 to 31"
  );

  expect(() => new NaturalDate(2019, 8, 0)).toThrow(
    "Only accept date from 1 to 31"
  );
});

test("Construct simple date with invalid month", () => {
  expect(() => new NaturalDate(2019, 13, 8)).toThrow(
    "Only accept month from 1 to 12"
  );

  expect(() => new NaturalDate(2019, 0, 8)).toThrow(
    "Only accept month from 1 to 12"
  );
});

test("Construct simple date with invalid leap year", () => {
  expect(() => new NaturalDate(2019, 2, 29)).toThrow(
    "Year 2019 is not a leap year"
  );
});

test("Construct simple date with invalid hour", () => {
  expect(() => new NaturalDate(2019, 1, 1, 24)).toThrow(
    "Only accept hour from 0 to 23"
  );

  expect(() => new NaturalDate(2019, 1, 1, -1)).toThrow(
    "Only accept hour from 0 to 23"
  );
});

test("Construct simple date with invalid minute", () => {
  expect(() => new NaturalDate(2019, 1, 1, 0, 60)).toThrow(
    "Only accept minute from 0 to 59"
  );

  expect(() => new NaturalDate(2019, 1, 1, 0, -1)).toThrow(
    "Only accept minute from 0 to 59"
  );
});

test("Construct simple date with invalid second", () => {
  expect(() => new NaturalDate(2019, 1, 1, 0, 0, 60)).toThrow(
    "Only accept second from 0 to 59"
  );

  expect(() => new NaturalDate(2019, 1, 1, 0, 0, -1)).toThrow(
    "Only accept second from 0 to 59"
  );
});

test("Construct simple date with invalid millisecond", () => {
  expect(() => new NaturalDate(2019, 1, 1, 0, 0, 0, 1000)).toThrow(
    "Only accept millisecond from 0 to 999"
  );

  expect(() => new NaturalDate(2019, 1, 1, 0, 0, 0, -1)).toThrow(
    "Only accept millisecond from 0 to 999"
  );
});

test("Test equal date", () => {
  let date1 = new Date(2019, 0, 1);
  let date2 = new NaturalDate(2019, 1, 1);

  expect(date2).toEqual(date1);
});

test("Test function fromDate", () => {
  let date = new Date(2019, 0, 1);
  let naturalDate = NaturalDate.fromDate(date);

  expect(date.getTime()).toEqual(naturalDate.getTime());
});

test("Test date included in array", () => {
  const array = [
    new Date(2019, 0, 1),
    new Date(2019, 1, 1),
    new Date(2019, 2, 1),
    new Date(2019, 3, 1)
  ];
  const date = new NaturalDate(2019, 2, 1);

  expect(array).toContainEqual(date);
});

test("Test equal date arrays", () => {
  const array1 = [
    new Date(2019, 0, 1),
    new Date(2019, 1, 1),
    new Date(2019, 2, 1),
    new Date(2019, 3, 1)
  ];

  const array2 = [
    new Date(2019, 2, 1),
    new Date(2019, 3, 1),
    new Date(2019, 0, 1),
    new Date(2019, 1, 1)
  ];

  expect(array1).toIncludeSameMembers(array2);
});
