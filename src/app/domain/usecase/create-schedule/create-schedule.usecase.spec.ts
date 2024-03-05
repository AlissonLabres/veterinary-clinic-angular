import { TestBed } from "@angular/core/testing";
import { ScheduleRepositoryToken } from "../../../config/injection-token.repositories";
import { ScheduleRepositoryInterface } from "../../repository/schedule-repository.interface";
import { CreateScheduleUsecase } from "./create-schedule.usecase";
import { ScheduleOutput } from "./schedule-output";
import { of, take } from "rxjs";

describe('CreateScheduleUsecase', () => {
  let usecase: CreateScheduleUsecase;
  let scheduleRepository: ScheduleRepositoryInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateScheduleUsecase,
        {
          provide: ScheduleRepositoryToken,
          useValue: { createSchedule: jest.fn() }
        }
      ]
    });

    usecase = TestBed.inject(CreateScheduleUsecase);
    scheduleRepository = TestBed.inject(ScheduleRepositoryToken);
  });

  it('should return a value when execute createSchedule on success', () => {
    const outcome = { id: '001', status: 'SCHEDULED' };

    (scheduleRepository.createSchedule as jest.Mock).mockReturnValue(
      of({ schedule_id: '001', schedule_status: 'SCHEDULED' })
    );

    usecase.execute('001')
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
