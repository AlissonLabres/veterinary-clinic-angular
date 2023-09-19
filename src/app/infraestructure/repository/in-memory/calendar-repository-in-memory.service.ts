import { Injectable } from '@angular/core';

import { Observable, interval, map, of, takeUntil } from 'rxjs';
import { BulletEntity } from '../../../domain/entity/bullet.entity';
import { CalendarRepositoryInterface } from '../../../domain/repository/calendar-repository.interface';

@Injectable()
export class CalendarRepositoryInMemoryService implements CalendarRepositoryInterface {
  private calendar: any[];


  constructor() {
    this.calendar = [
      {
        id: '0001',
        code: '2023-09-08T16:00'
      },
      {
        id: '0002',
        code: '2023-09-10T13:00'
      },
      {
        id: '0003',
        code: '2023-09-13T13:00'
      },
      {
        id: '0004',
        code: '2023-09-10T16:00'
      }
    ];
  }

  sendSchedule(bullet: BulletEntity): Observable<void> {
    this.calendar = this.calendar.filter((b: any) => b.code !== bullet.code);
    return of();
  }

  getBulletsAvailable(): Observable<BulletEntity[]> {
    const timerUntil$ = interval(600);

    return interval(500).pipe(
      takeUntil(timerUntil$),
      map(() => this.calendar)
    );
  }

}
