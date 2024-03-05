export class ScheduleException implements Error {
  name: string = 'SCHEDULE_EXCEPTION';
  message: string;

  constructor(message: string = 'Schedule has error') {
    this.message = message;
  }
}
