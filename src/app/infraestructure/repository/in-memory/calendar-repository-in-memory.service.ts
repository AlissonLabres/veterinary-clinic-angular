import { Injectable } from '@angular/core';

import { Observable, interval, map, takeUntil } from 'rxjs';
import { BulletEntity } from '../../../domain/entity/bullet.entity';
import { CalendarRepositoryInterface } from '../../../domain/repository/calendar-repository.interface';

@Injectable()
export class CalendarRepositoryInMemoryService implements CalendarRepositoryInterface {
  private readonly calendar: any[];


  constructor() {
    this.calendar = [
      {
        id: '0001',
        code: '2023-09-08T16:00',
        available: 3
      },
      {
        id: '0002',
        code: '2023-09-10T13:00',
        available: 2
      },
      {
        id: '0003',
        code: '2023-09-13T13:00',
        available: 2
      },
      {
        id: '0004',
        code: '2023-09-10T16:00',
        available: 2
      }
    ];
  }

  getBulletsAvailable(): Observable<BulletEntity[]> {
    const timerUntil$ = interval(600);

    return interval(500).pipe(
      takeUntil(timerUntil$),
      map(() => this.calendar)
    );
  }

}
