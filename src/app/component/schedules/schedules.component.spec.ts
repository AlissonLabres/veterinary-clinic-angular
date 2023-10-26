import { render } from '@testing-library/angular';
import { SchedulesComponent } from './schedules.component';
import { provideMockStore } from '@ngrx/store/testing';
import { GetScheduleSelector } from '../../redux/schedule/schedule.selector';

describe('SchedulesComponent', () => {
  it('should render schedules', async () => {
    const schedules = [
      {
        schedule_id: 2,
        bullet_code: new Date(),
        schedule_status: 'Scheduled',
        type_service: 'Service Type 1',
      }
    ];

    const selectorScheduleMock = {
      selector: GetScheduleSelector,
      value: schedules,
    };

    const { getByText } = await render(SchedulesComponent, {
      providers: [provideMockStore({ selectors: [selectorScheduleMock] })],
    })

    expect(getByText(schedules[0].bullet_code.toLocaleDateString())).toBeTruthy();
    // expect(getByText(schedules[0].bullet_code.toLocaleTimeString())).toBeTruthy();
    expect(getByText(schedules[0].schedule_status)).toBeTruthy();
    expect(getByText(schedules[0].type_service)).toBeTruthy();
  });
});
