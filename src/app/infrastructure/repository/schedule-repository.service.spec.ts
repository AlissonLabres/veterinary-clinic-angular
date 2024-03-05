/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleRepositoryService } from './schedule-repository.service';

describe('Service: ScheduleRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleRepositoryService]
    });
  });

  it('should ...', inject([ScheduleRepositoryService], (service: ScheduleRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
