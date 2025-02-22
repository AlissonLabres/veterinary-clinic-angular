import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateScheduleComponent } from './create-schedule.component';
import { CreateSuccessSchedule } from '../../redux/schedule/schedule.selector';
import { MockComponents } from 'ng-mocks';
import { render, screen } from '@testing-library/angular';
import { ProgressStepComponent } from './progress-step/progress-step.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { TimesComponent } from '../times/times.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import userEvent from '@testing-library/user-event';

describe('CreateScheduleComponent', () => {
  it('should create component, click to create schedule and ensures to it was called once', async () => {
    const user = userEvent.setup();
    const { fixture } = await renderCreateSchedule();

    fixture.componentInstance.schedule = {
      date: '2023-02-08',
      hour: '16:00',
      user_id: 1,
    };
    fixture.detectChanges();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const createSchedule = screen.getByTestId('button-create-schedule');
    await user.click(createSchedule);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Schedule] Creating schedule',
      date: '2023-02-08',
      hour: '16:00',
      user_id: 1,
    });
  });
});

const renderCreateSchedule = async () => {
  const selectorScheduleSuccess = {
    selector: CreateSuccessSchedule,
    value: undefined,
  };

  return render(CreateScheduleComponent, {
    declarations: MockComponents(
      ProgressStepComponent,
      CalendarComponent,
      TimesComponent
    ),
    providers: [provideMockStore({ selectors: [selectorScheduleSuccess] })],
  });
};
