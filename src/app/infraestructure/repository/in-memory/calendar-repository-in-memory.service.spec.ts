/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarRepositoryInMemoryService } from './calendar-repository-in-memory.service';
import { of } from 'rxjs';

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
});
