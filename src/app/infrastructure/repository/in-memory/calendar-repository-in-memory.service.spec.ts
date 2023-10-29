/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarRepositoryInMemoryService } from './calendar-repository-in-memory.service';
import { of } from 'rxjs';
import { BulletEntity } from '../../../domain/entity/bullet.entity';

describe('Service: CalendarRepositoryInMemory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CalendarRepositoryInMemoryService] });
  });

  it('should receive calendar available', inject([CalendarRepositoryInMemoryService], (service: CalendarRepositoryInMemoryService) => {
    service.getBulletsAvailable().subscribe((value) => {
      expect(value).toEqual([{
        id: '0001',
        code: '2023-08-08T16:00',
        available: 3
      }]);
    })
  }));

  it('should send calendar', inject([CalendarRepositoryInMemoryService], (service: CalendarRepositoryInMemoryService) => {
    const bullet = {
      id: '0001',
      code: '2023-08-08T16:00'
    } as BulletEntity;

    service.sendSchedule(bullet).subscribe((value) => {
      expect(value).toEqual([{
        id: '0001',
        code: '2023-08-08T16:00',
        available: 3
      }]);
    })
  }));
});
