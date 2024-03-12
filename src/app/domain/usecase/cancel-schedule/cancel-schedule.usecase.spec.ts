import { TestBed } from "@angular/core/testing";
import { of, take } from "rxjs";

import { ScheduleRepositoryToken } from "../../../config/injection-token.repositories";
import { ScheduleRepositoryInterface } from "../../repository/schedule-repository.interface";

import { CancelScheduleUsecase } from "./cancel-schedule.usecase";

describe('CancelScheduleUsecase', () => {
  let usecase: CancelScheduleUsecase;
  let scheduleRepository: ScheduleRepositoryInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CancelScheduleUsecase,
        {
          provide: ScheduleRepositoryToken,
          useValue: { cancelSchedule: jest.fn() }
        }
      ]
    });

    usecase = TestBed.inject(CancelScheduleUsecase);
    scheduleRepository = TestBed.inject(ScheduleRepositoryToken);
  });

  it('should return a value when execute cancelSchedule on success', () => {
    const outcome = { id: '001', status: 'SCHEDULED' };

    (scheduleRepository.cancelSchedule as jest.Mock).mockReturnValue(of());

    usecase.execute(1)
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
