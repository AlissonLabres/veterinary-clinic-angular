import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BulletEntity } from '../../../domain/entity/bullet.entity';
import { CalendarRepositoryInterface } from '../../../domain/repository/calendar-repository.interface';

@Injectable({ providedIn: 'root' })
export class CalendarRepositoryServerService implements CalendarRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }
  sendSchedule(bullet: BulletEntity): Observable<void> {
    const input = {
      user_id: 1,
      medical_id: 1,
      animal_id: 1,
      bullet_code: bullet.code
    };

    return this.httpClient.post<void>('http://localhost:3000/schedule/appointment', input);
  }

  getBulletsAvailable(): Observable<BulletEntity[]> {
    return this.httpClient.get<{ bullets: BulletEntity[] }>('http://localhost:3000/bullets')
      .pipe(map(({ bullets }) => bullets))
  }
}
