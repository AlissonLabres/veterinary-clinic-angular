import { render } from '@testing-library/angular';
import { SchedulesComponent } from './schedules.component';
import { provideMockStore } from '@ngrx/store/testing';
import { GetScheduleSelector } from '../../redux/schedule/schedule.selector';

describe('SchedulesComponent', () => {
  it('should render schedules', async () => {
    const schedules = [
      {
        schedule_id: 2,
        bullet_code: '2023-10-01T16:00',
        schedule_status: 'Scheduled',
        type_service: 'Appointment',
      }
    ];

    const selectorScheduleMock = {
      selector: GetScheduleSelector,
      value: schedules,
    };

    const { getByText } = await render(SchedulesComponent, {
      providers: [provideMockStore({ selectors: [selectorScheduleMock] })],
    })

    expect(getByText('01/10/2023 as 16:00')).toBeTruthy();
    expect(getByText('scheduled')).toBeTruthy();
    expect(getByText('appointment')).toBeTruthy();
  });
});
