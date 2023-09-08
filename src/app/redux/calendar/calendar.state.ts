export interface CalendarInterface {
  date: Date;
  last: number[];
  current: number[];
  next: number[];
}

export interface CalendarStateInterface {
  entity: CalendarInterface;
}
