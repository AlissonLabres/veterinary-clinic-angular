import { HttpClient } from "@angular/common/http";
import { CalendarRepositoryService } from "./calendar-repository.service";
import { TestBed } from "@angular/core/testing";
import { ScheduleEntity } from "../../domain/entity/schedule.entity";
import { of, take } from "rxjs";
import { BulletEntity } from "../../domain/entity/bullet.entity";

describe('CalendarRepositoryService', () => {
  let service: CalendarRepositoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarRepositoryService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
            post: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(CalendarRepositoryService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value when dispatch getAllSchedules on success', () => {
    const outcome: ScheduleEntity[] = [];

    (httpClient.get as jest.Mock).mockReturnValue(of(outcome));

    service.getAllSchedules()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });

  it('should return a value when dispatch sendSchedule on success', () => {
    const bullet = new BulletEntity('0001', '2023-09-08T16:00');

    (httpClient.post as jest.Mock).mockReturnValue(of(bullet));

    service.sendSchedule(bullet)
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(bullet));
  });
});
