import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';
import { TimesComponent } from './times.component';
import { EventEmitter } from '@angular/core';

describe(TimesComponent.name, () => {
  it('should create component and view times rendered', async () => {
    await renderTimes();
    expect(screen.getByTestId('times-page')).toBeInTheDocument();
    expect(screen.getByTestId('time')).toHaveTextContent('16:00');
  });

  it('should create component, emit to select and ensures to it was called once', async () => {
    const spy = jest.fn();
    const { fixture } = await renderTimes(spy);

    const calendarComponent = fixture.componentInstance;
    calendarComponent.select('18:00');

    expect(spy).toHaveBeenCalledWith('18:00');
  });
});

const renderTimes = async (selectSpy: jest.Mock = jest.fn()) => {
  const bulletsTimeAvailable = ['16:00'];

  return render(TimesComponent, {
    componentProperties: {
      bulletsTimeAvailable,
      bullet: { emit: selectSpy } as unknown as EventEmitter<string>,
    },
  })
}
