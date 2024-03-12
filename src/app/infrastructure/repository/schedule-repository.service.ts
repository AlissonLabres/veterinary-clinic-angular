import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleRepositoryInterface } from '../../domain/repository/schedule-repository.interface';
import { Observable, debounce, debounceTime } from 'rxjs';
import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ScheduleRepositoryService implements ScheduleRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }

  cancelSchedule(id: number): Observable<void> {
    const input = { schedule_id: id };

    return this.httpClient.post<void>(`${environment.api}/schedule/cancel`, input);
  }

  createSchedule(bullet_code: string): Observable<ScheduleEntity> {
    const input = {
      user_id: 1,
      medical_id: 1,
      animal_id: 1,
      bullet_code: bullet_code
    };

    return this.httpClient.post<ScheduleEntity>(`${environment.api}/schedule/appointment`, input);
  }

  getScheduleByUser(id: string): Observable<ScheduleEntity[]> {
    return this.httpClient.get<ScheduleEntity[]>(`${environment.api}/schedule/${id}`)
  }

}
