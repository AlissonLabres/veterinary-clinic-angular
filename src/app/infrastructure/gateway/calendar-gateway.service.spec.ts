import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { CalendarGatewayService } from "./calendar-gateway.service";
import { of, take } from "rxjs";

describe('CalendarGateway', () => {
  let gateway: CalendarGatewayService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarGatewayService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn().mockReturnValue(of()),
            post: jest.fn().mockReturnValue(of())
          }
        }
      ]
    });

    gateway = TestBed.inject(CalendarGatewayService);
    http = TestBed.inject(HttpClient);

    gateway.date = new Date('2022-02-01T12:00');
  });

  it('should be created', () => {
    expect(gateway).toBeTruthy();
  });

  it('should return a value when dispatch get on success', () => {
    const value = { date: new Date('2022-02-01T12:00'), last: [], current: [], next: [] };
    const outcome = value;

    jest.spyOn(http, 'get').mockReturnValue(of(value));

    gateway.get()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });

  it('should return a value when dispatch previous on success', () => {
    const value = { date: new Date('2022-02-01T12:00'), last: [], current: [], next: [] };
    const outcome = value;

    jest.spyOn(http, 'post').mockReturnValue(of(value));

    gateway.previous()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });

  it('should return a value when dispatch next on success', () => {
    const value = { date: new Date('2022-02-01T12:00'), last: [], current: [], next: [] };
    const outcome = value;

    jest.spyOn(http, 'post').mockReturnValue(of(value));

    gateway.next()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
