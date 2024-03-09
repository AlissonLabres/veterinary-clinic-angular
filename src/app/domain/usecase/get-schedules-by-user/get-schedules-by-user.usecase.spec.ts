import { TestBed } from '@angular/core/testing';
import { of, take } from 'rxjs';
import { GetSchedulesByUserUsecase } from './get-schedules-by-user.usecase';
import { ScheduleOutput } from './schedule-output';
import { ScheduleRepositoryInterface } from '../../repository/schedule-repository.interface';
import { ScheduleRepositoryToken } from '../../../config/injection-token.repositories';

describe('GetSchedulesByUserUsecase', () => {
  let usecase: GetSchedulesByUserUsecase;
  let bulletRepository: ScheduleRepositoryInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetSchedulesByUserUsecase,
        {
          provide: ScheduleRepositoryToken,
          useValue: { getScheduleByUser: jest.fn() }
        }
      ]
    });

    usecase = TestBed.inject(GetSchedulesByUserUsecase);
    bulletRepository = TestBed.inject(ScheduleRepositoryToken);
  });

  it('should return a value when execute getBulletsAvailable on success', () => {
    const outcome: ScheduleOutput[] = [
      {
        schedule_id: 1,
        schedule_status: 'scheduled',
        bullet_code: '2023-09-08T16:00',
        type_service: 'appointment'
      }
    ];

    (bulletRepository.getScheduleByUser as jest.Mock).mockReturnValue(
      of([{
        schedule_id: 1,
        schedule_status: 'scheduled',
        bullet_code: '2023-09-08T16:00',
        type_service: 'appointment'
      }])
    );

    usecase.execute('1')
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
