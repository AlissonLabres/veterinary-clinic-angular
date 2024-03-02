import '@testing-library/jest-dom';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MockComponents } from 'ng-mocks';

import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { GetBulletSelector, GetBulletsDateSelector, GetErrorBullet, GetLoadingBullet, GetSuccessBullet } from '../../redux/bullet/bullet.selector';

import { CalendarComponent } from './calendar.component';
import { DatesComponent } from '../dates/dates.component';
import { TimesComponent } from '../times/times.component';

import { GetCalendarSelector } from '../../redux/calendar/calendar.selector';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe(CalendarComponent.name, () => {
  it('should create component and view loading page', async () => {
    await renderCalendar('true')
    expect(screen.queryByTestId('loading-page')).toBeInTheDocument();
    expect(screen.queryByTestId('card-page')).not.toBeInTheDocument();
  });

  it('should create component and not view loading page', async () => {
    await renderCalendar()
    expect(screen.queryByTestId('card-page')).toBeInTheDocument();
    expect(screen.queryByTestId('loading-page')).not.toBeInTheDocument();
  });

  it('should create component and view month and date information', async () => {
    await renderCalendar();
    expect(screen.queryByTestId('month-year-date')).toHaveTextContent('FEVEREIRO 2023');
  });

  it('should create component and error', async () => {
    await renderCalendar('false', jest.fn(), undefined, 'Error message');
    expect(screen.queryByTestId('alert-error')).toHaveTextContent('Error message');
  });

  it('should create component, click to previous month and ensures to it was called once', async () => {
    const { fixture, rerender } = await renderCalendar();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    rerender();

    const component = fixture.componentInstance;
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenNthCalledWith(1, { type: '[Bullet] Load dates to bullet' });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, { type: '[Calendar] Loading calendar' });
  });

  it('should create component, click to previous month and ensures to it was called once', async () => {
    const user = userEvent.setup();
    await renderCalendar();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const previousMonth = screen.getByTestId('previous-month');
    await user.click(previousMonth);

    expect(store.dispatch).toHaveBeenCalledWith({ type: '[Calendar] Loading previous month' });
  });

  it('should create component, click to next month and ensures to it was called once', async () => {
    const user = userEvent.setup();
    await renderCalendar();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const nextMonth = screen.getByTestId('next-month');
    await user.click(nextMonth);

    expect(store.dispatch).toHaveBeenCalledWith({ type: '[Calendar] Loading next month' });
  });

  it('should create component, click to next month and ensures to it was called once', async () => {
    const user = userEvent.setup();
    await renderCalendar();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const sendBullet = screen.getByTestId('send-bullet');
    await user.click(sendBullet);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Bullet] Send bullet to server',
      entity: {
        date: "2023-02-08",
        hour: "16:00",
      }
    });
  });

  it('should create component, click to send bullet and ensures to it was called once', async () => {
    const user = userEvent.setup();
    await renderCalendar();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const sendBullet = screen.getByTestId('send-bullet');
    await user.click(sendBullet);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Bullet] Send bullet to server',
      entity: {
        date: "2023-02-08",
        hour: "16:00",
      }
    });
  });

  it('should create component, emit to select day and ensures to it was called once', async () => {
    const { fixture, rerender } = await renderCalendar();
    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    rerender();

    const calendarComponent = fixture.componentInstance;
    calendarComponent.selectDay(new Date('2023-02-08'));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Calendar] Select date calendar success',
      value: new Date('2023-02-08')
    });
  });

  it('should create component, emit to select bullet and ensures to it was called once', async () => {
    const { fixture, rerender } = await renderCalendar();
    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    rerender();

    const calendarComponent = fixture.componentInstance;
    calendarComponent.selectBullet('18:00');

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Calendar] Select hour calendar success',
      value: "18:00"
    });
  });

  it('should create component, subcribe to bullet success and view message', async () => {
    const spy = jest.fn().mockReturnValue(['/']);
    await renderCalendar('false', jest.fn(), 'OK', undefined, spy);

    expect(spy).toHaveBeenCalledWith(['/']);
  });
});

const renderCalendar = async (
  status: string = 'false',
  selectSpy: jest.Mock = jest.fn(),
  success: string | undefined = undefined,
  error: string | undefined = undefined,
  routerMock: jest.Mock = jest.fn(),
) => {
  const selectorLoadingBulletMock = {
    selector: GetLoadingBullet,
    value: status,
  };

  const selectorBulletsMock = {
    selector: GetBulletSelector,
    value: { date: '2023-02-08', hour: '16:00' },
  };

  const selectorBulletAvailable = {
    selector: GetBulletsDateSelector,
    value: ['2023-02-08', '2023-02-13'],
  };

  const selectorBulletError = {
    selector: GetErrorBullet,
    value: error,
  };

  const selectorBulletSuccess = {
    selector: GetSuccessBullet,
    value: success,
  };

  const selectorCalendarMock = {
    selector: GetCalendarSelector,
    value: {
      date: new Date('2023-02-08'),
      last: [30, 31],
      current: [1, 15, 20, 30],
      next: [1, 3]
    },
  };

  return render(CalendarComponent, {
    imports: [RouterTestingModule],
    declarations: MockComponents(DatesComponent, TimesComponent),
    componentProperties: { selectDay: selectSpy },
    providers: [
      {
        provide: Router,
        useValue: {
          navigate: routerMock
        }
      },
      provideMockStore({
        selectors: [
          selectorLoadingBulletMock,
          selectorBulletAvailable,
          selectorCalendarMock,
          selectorBulletsMock,
          selectorBulletError,
          selectorBulletSuccess,
        ]
      })
    ],
  })
}
