import '@testing-library/jest-dom';

import { RouterTestingModule } from '@angular/router/testing';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
} from '@testing-library/angular';

import { MockComponents } from 'ng-mocks';

import { AppComponent } from './app.component';
import { CreateScheduleComponent } from './web/component/create-schedule/create-schedule.component';
import { SchedulesComponent } from './web/component/schedules/schedules.component';
import { Routes } from '@angular/router';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe(AppComponent.name, () => {
  it(`should have as title 'Petshop Online'`, async () => {
    await renderAppComponent();
    expect(screen.getByTestId('title-page').textContent).toEqual(
      'Petshop Online'
    );
  });

  it(`should have as title 'Petshop Online'`, async () => {
    await renderAppComponent();
    expect(screen.getByTestId('title-page').textContent).toEqual(
      'Petshop Online'
    );
  });

  it('should render buttons', async () => {
    const { getByText } = await renderAppComponent();

    const appointmentButton = getByText('Agendar consulta');
    expect(appointmentButton).toBeTruthy();
  });

  it('should navigate to schedule create page when appointment button is clicked', async () => {
    const { getByTestId, location } = await renderAppComponent();
    const appointmentButton = getByTestId('button-navigate-schedule');
    fireEvent.click(appointmentButton);

    expect(location.path()).toEqual('/schedule/create');
  });

  it('should navigate to schedule page when title page is clicked', async () => {
    const { getByTestId, location } = await renderAppComponent();
    const title = getByTestId('title-page');
    fireEvent.click(title);

    expect(location.path()).toEqual('/schedule');
  });
});

const renderAppComponent = async () => {
  const routes: Routes = [
    { path: 'schedule', component: SchedulesComponent },
    { path: 'schedule/create', component: CreateScheduleComponent },
    { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  ];

  const renderApp = await render(AppComponent, {
    imports: [RouterTestingModule.withRoutes(routes)],
    declarations: [MockComponents(SchedulesComponent, CreateScheduleComponent)],
    providers: [provideMockStore({ selectors: [] })],
  });
  const location: Location = TestBed.inject(Location);

  return { ...renderApp, location };
};
