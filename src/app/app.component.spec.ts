import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';

import { MockComponent } from 'ng-mocks';

import { AppComponent } from './app.component';
import { CalendarComponent } from './component/calendar/calendar.component';

describe(AppComponent.name, () => {

  beforeEach(async () => {
    await render(AppComponent, {
      imports: [RouterTestingModule],
      declarations: [MockComponent(CalendarComponent)]
    })
  });

  it(`should have as title 'Petshop Online'`, () => {
    expect(screen.getByTestId('title-page').textContent).toEqual('Petshop Online');
  });
});
