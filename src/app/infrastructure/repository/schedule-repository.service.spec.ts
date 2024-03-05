/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleRepositoryService } from './schedule-repository.service';
import { HttpClient } from '@angular/common/http';
import { ScheduleEntity } from '../../domain/entity/schedule.entity';
import { of, take } from 'rxjs';
import { BulletEntity } from '../../domain/entity/bullet.entity';

describe('ScheduleRepository', () => {
  let service: ScheduleRepositoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleRepositoryService,
        {
          provide: HttpClient,
          useValue: { get: jest.fn(), post: jest.fn() }
        }
      ]
    });

    service = TestBed.inject(ScheduleRepositoryService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value when dispatch sendSchedule on success', () => {
    const bullet = new BulletEntity('0001', '2023-09-08T16:00');

    (httpClient.post as jest.Mock).mockReturnValue(of(bullet));

    service.createSchedule('0001')
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(bullet));
  });

  it('should return a value when dispatch getAllSchedules on success', () => {
    const outcome: ScheduleEntity[] = [];

    (httpClient.get as jest.Mock).mockReturnValue(of(outcome));

    service.getScheduleByUser('1')
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
