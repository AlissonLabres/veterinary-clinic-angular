import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';
import { TimesComponent } from './times.component';

describe(TimesComponent.name, () => {
  it('should create component and view times rendered', async () => {
    await renderTimes();
    expect(screen.getByTestId('times-page')).toBeInTheDocument();
    expect(screen.getByTestId('time')).toHaveTextContent('16:00');
  });
});

const renderTimes = async () => {
  const bulletsTimeAvailable = ['16:00'];

  await render(TimesComponent, {
    componentInputs: { bulletsTimeAvailable },
  })
}
