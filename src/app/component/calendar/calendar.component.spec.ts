import '@testing-library/jest-dom';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MockComponents } from 'ng-mocks';

import { createEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';

import { GetBulletsDateSelector, GetBulletsTimePerDaySelector, GetLoadingBullet } from '../../redux/bullet/bullet.selector';

import { CalendarComponent } from './calendar.component';
import { DatesComponent } from '../dates/dates.component';
import { TimesComponent } from '../times/times.component';

import { GetCalendarSelector } from '../../redux/calendar/calendar.selector';
import { By } from '@angular/platform-browser';


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
});

const renderCalendar = async (status: string = 'false', selectSpy: jest.Mock = jest.fn()) => {
  const selectorLoadingBulletMock = {
    selector: GetLoadingBullet,
    value: status,
  };

  const selectorBulletAvailable = {
    selector: GetBulletsDateSelector,
    value: ['2023-02-08', '2023-02-13'],
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
    declarations: MockComponents(DatesComponent, TimesComponent),
    componentProperties: { select: selectSpy },
    providers: [
      provideMockStore({ selectors: [selectorLoadingBulletMock, selectorBulletAvailable, selectorCalendarMock] })
    ],
  })
}
