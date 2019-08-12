import ITime from "./ITime";

class Time implements ITime {
  readonly hours: number;
  readonly minutes: number;

  constructor(hours: number, minutes: number) {
    this._validate();
    this.hours = hours;
    this.minutes = minutes;
  }

  private _validate() {
    if (this.hours < 0 || this.hours > 23) {
      throw new Error("Only accept hour from 0 to 23");
    }

    if (this.minutes < 0 || this.minutes > 59) {
      throw new Error("Only accept minute from 0 to 59");
    }
  }
}

export default Time;
