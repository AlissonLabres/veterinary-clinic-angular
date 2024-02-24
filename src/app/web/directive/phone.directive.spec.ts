import '@testing-library/jest-dom';

import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/angular";
import { PhoneDirective } from "./phone.directive";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Component } from "@angular/core";

@Component({
  selector: 'app-phone-fixture',
  template: '<form [formGroup]="form"><input data-testid="phone-testing" formControlName="phone" phone /></form>',
})
class PhoneComponentFixture {
  form = new FormGroup({ phone: new FormControl('') });
}

describe('Directive: Phone', () => {

  it('Should formate input when includes 2 values in field', async () => {
    const user = userEvent.setup();

    await render(PhoneComponentFixture, {
      imports: [ReactiveFormsModule],
      declarations: [PhoneDirective, PhoneComponentFixture]
    });

    const directive = screen.getByTestId('phone-testing');
    await user.type(directive, '11');

    expect(directive).toHaveValue('(11');
  });

  it('Should formate input when includes 8 values in field', async () => {
    const user = userEvent.setup();

    await render(PhoneComponentFixture, {
      imports: [ReactiveFormsModule],
      declarations: [PhoneDirective, PhoneComponentFixture]
    });

    const directive = screen.getByTestId('phone-testing');
    await user.type(directive, '1199999');

    expect(directive).toHaveValue('(11) 99999');
  });

  it('Should formate input when includes 11 values in field', async () => {
    const user = userEvent.setup();

    await render(PhoneComponentFixture, {
      imports: [ReactiveFormsModule],
      declarations: [PhoneDirective, PhoneComponentFixture]
    });

    const directive = screen.getByTestId('phone-testing');
    await user.type(directive, '11999999999');

    expect(directive).toHaveValue('(11) 99999-9999');
  });

});
