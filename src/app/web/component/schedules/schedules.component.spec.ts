import '@testing-library/jest-dom';
import { TestBed } from '@angular/core/testing';
import { fireEvent, render } from '@testing-library/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SchedulesComponent } from './schedules.component';

import { GetLoadingSchedule, GetScheduleSelector } from '../../redux/schedule/schedule.selector';
import { ScheduleInterface } from '../../redux/schedule/schedule.state';

describe('SchedulesComponent', () => {
  it('should render schedules', async () => {
    const schedules: ScheduleInterface[] = [
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

  it('should render empty schedules', async () => {
    const schedules: ScheduleInterface[] = [];

    const selectorScheduleMock = {
      selector: GetScheduleSelector,
      value: schedules,
    };

    const { getByTestId } = await render(SchedulesComponent, {
      providers: [provideMockStore({ selectors: [selectorScheduleMock] })],
    })

    const emptyListMessage = getByTestId('empty-list');
    expect(emptyListMessage.textContent?.trim()).toEqual('Nenhum agendamento para este usuário');
  });

  it('should view modal cancel when click button', async () => {
    const schedules: ScheduleInterface[] = [
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

    const { getByTestId, getByText } = await render(SchedulesComponent, {
      providers: [provideMockStore({ selectors: [selectorScheduleMock] })],
    })

    const button = getByTestId('cancel-button');
    fireEvent.click(button);

    expect(getByText('cancelar agendamento')).toBeTruthy();
    expect(getByText('Você quer realmente cancelar o agendamento do dia?')).toBeTruthy();
  });


  it('should dispatch cancel when confirmation button cancel', async () => {
    const schedules: ScheduleInterface[] = [
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

    const selectorLoadingMock = {
      selector: GetLoadingSchedule,
      value: false,
    };

    const { getByTestId } = await render(SchedulesComponent, {
      providers: [provideMockStore({ selectors: [selectorScheduleMock, selectorLoadingMock] })],
    })

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const button = getByTestId('cancel-button');
    fireEvent.click(button);

    const confirmButton = getByTestId('confirm-cancel-button');
    fireEvent.click(confirmButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Schedule] Canceling schedule',
      schedule_id: 2
    });
  });

  it('should view button cancel loading when loading is true', async () => {
    const schedules: ScheduleInterface[] = [
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

    const selectorLoadingMock = {
      selector: GetLoadingSchedule,
      value: true,
    };

    const { getByTestId } = await render(SchedulesComponent, {
      providers: [provideMockStore({ selectors: [selectorScheduleMock, selectorLoadingMock] })],
    })

    const button = getByTestId('cancel-loading-button');

    expect(button).toBeVisible();
  });
});
