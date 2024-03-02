import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';

import { DatesComponent } from './dates.component';
import userEvent from '@testing-library/user-event';

describe(DatesComponent.name, () => {
  it('should create component and view dates rendered', async () => {
    await renderComponent()

    expect(screen.queryByTestId('previous')).toHaveTextContent('31');
    expect(screen.getByTestId('day-8')).toHaveTextContent('8');
    expect(screen.queryByTestId('next')).toHaveTextContent('1');
  });

  it('should create component and view date active and not active', async () => {
    await renderComponent();

    const selectDay = screen.getByTestId('day-8');
    const warning = selectDay.classList.item(6);
    const bold = selectDay.classList.item(7);
    const cursor = selectDay.classList.item(8);

    const notSelectDay = screen.getByTestId('day-13');
    const secondary = notSelectDay.classList.item(6);

    expect(warning).toEqual('text-indigo');
    expect(bold).toEqual('fw-bold');
    expect(cursor).toEqual('cursor-click');

    expect(secondary).toEqual('border-0');
  });

  it('should create component, click in date active and emitter date', async () => {
    const user = userEvent.setup();

    const selectSpy = jest.fn();
    await renderComponent(selectSpy);

    const day = screen.getByTestId('day-8');
    await user.click(day);

    expect(selectSpy).toHaveBeenCalledTimes(1);
  });

  it('should create component, click in date inactive and not emitter date', async () => {
    const user = userEvent.setup();

    const selectSpy = jest.fn();
    await renderComponent(selectSpy);

    const day = screen.getByTestId('day-13');
    await user.click(day);

    expect(selectSpy).toHaveBeenCalledTimes(0);
  });
});

const renderComponent = async (selectSpy: jest.Mock = jest.fn()) => {
  const bulletsDateAvailable = ['2023-03-08']

  const calendar = {
    date: new Date('2023-03-04'),
    last: [31],
    current: [8, 13],
    next: [1]
  };


  await render(DatesComponent, {
    componentProperties: {
      calendar,
      bulletsDateAvailable,
      day: { emit: selectSpy } as any
    }
  })
}
