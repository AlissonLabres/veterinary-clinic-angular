export class CalendarEntity {

  constructor(
    public last: number[],
    public current: number[],
    public next: number[],
    public date: Date
  ) { }

  static restore(dto: any) {
    return new CalendarEntity(dto.last, dto.current, dto.next, dto.date);
  }

}
