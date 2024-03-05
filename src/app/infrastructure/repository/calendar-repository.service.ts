import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BulletEntity } from '../../domain/entity/bullet.entity';
import { CalendarRepositoryInterface } from '../../domain/repository/calendar-repository.interface';
import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class CalendarRepositoryService implements CalendarRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }

  getAllSchedules(): Observable<ScheduleEntity[]> {
    return this.httpClient.get<ScheduleEntity[]>(`${environment.api}/schedule/1`)
  }

  sendSchedule(bullet: BulletEntity): Observable<BulletEntity> {
    const input = {
      user_id: 1,
      medical_id: 1,
      animal_id: 1,
      bullet_code: bullet.code
    };

    return this.httpClient.post<BulletEntity>(`${environment.api}/schedule/appointment`, input);
  }
}
