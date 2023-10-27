import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarInterface } from '../../redux/calendar/calendar.state';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {
  @Input() calendar!: CalendarInterface;
  @Input() bulletsDateAvailable!: string[];
  @Output() day: EventEmitter<Date> = new EventEmitter<Date>();

  weekDaysName: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  constructor() { }

  ngOnInit() { }

  compateDate(day: number) {
    const dateCalendar = this.calendar.date;
    const date = new Date(dateCalendar.getFullYear(), dateCalendar.getMonth(), day);

    return this.hasBulletAvailableWith(date)
      ? 'text-indigo fw-bold cursor-click border-indigo'
      : 'border-0';
  }

  select(day: number) {
    const year = this.calendar.date.getFullYear();
    const month = this.calendar.date.getMonth()
    const date = new Date(year, month, day);

    if (this.hasBulletAvailableWith(date)) {
      this.day.emit(date);
    }
  }

  private hasBulletAvailableWith(date: Date) {
    return this.bulletsDateAvailable
      .findIndex((dateString: string) => this.compare(date, dateString)) > -1
  }

  private compare(from: Date, to: string) {
    return new Date(from).getDate() === new Date(`${to}T03:00`).getDate()
      && new Date(from).getMonth() === new Date(`${to}T03:00`).getMonth()
  }
}
