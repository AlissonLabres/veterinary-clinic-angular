import userEvent from '@testing-library/user-event';
import { HoverDayDirective } from './hover-day.directive';
import { render, screen } from '@testing-library/angular';

describe('Directive: HoverDay', () => {
  it('should create directive, hover component present class and unhover not present class', async () => {
    const user = userEvent.setup();
    await render('<div hover-day data-testid="hover-day"></div>', { declarations: [HoverDayDirective] });

    const directive = screen.getByTestId('hover-day');

    await user.hover(directive);
    expect(directive.classList.item(0)).toContain('rounded-2');
    expect(directive.classList.item(1)).toContain('border-secondary');
    expect(directive.classList.item(2)).toContain('border');

    await user.unhover(directive);
    expect(directive.classList.item(0)).toBeNull();
  });
});
