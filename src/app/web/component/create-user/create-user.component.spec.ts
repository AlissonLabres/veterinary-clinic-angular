import '@testing-library/jest-dom';

import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fireEvent, render, screen } from '@testing-library/angular';

import { CreateUserComponent } from './create-user.component';
import { PresentErrorPipe } from '../../pipe/present-error.pipe';
import { PhoneDirective } from '../../directive/phone.directive';
import { TestBed } from '@angular/core/testing';
import { GetErrorUser, GetLoadingUser, UserCreated } from '../../redux/user/user.selector';
import { Router } from '@angular/router';

describe('CreateUserComponent', () => {
  it('should render all required input fields', async () => {
    const { getByTestId } = await renderCreateUser();

    expect(getByTestId('input-name')).toBeTruthy();
    expect(getByTestId('input-email')).toBeTruthy();
    expect(getByTestId('input-phone')).toBeTruthy();
  });

  it('should validate form and show error message when name field is empty', async () => {
    const { getByTestId } = await renderCreateUser();
    const input = getByTestId('input-name');

    fireEvent.input(input, { target: { value: '' } });

    expect(getByTestId('text-error-name').textContent).toEqual('This field is required');
  });

  it('should clear the form after successful user creation', async () => {
    const { getByTestId } = await renderCreateUser('Error message');
    const alert = getByTestId('alert-error');

    expect(alert.textContent?.trim()).toEqual('Error message');
  });

  it('should clean form when user created', async () => {
    const spyRouterNavigate = jest.fn().mockReturnValue(['/users']);
    const { getByTestId } = await renderCreateUser(null, true, spyRouterNavigate);
    const form = getByTestId('form-create-user');

    expect(spyRouterNavigate).toHaveBeenCalledWith(['/users']);
  });

  it('should dispatch a create user action with form values when form is submitted', async () => {
    const { getByTestId } = await renderCreateUser();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const inputName = getByTestId('input-name');
    const inputEmail = getByTestId('input-email');
    const inputPhone = getByTestId('input-phone');

    fireEvent.input(inputName, { target: { value: 'Scott' } });
    fireEvent.input(inputEmail, { target: { value: 'email@email.com.br' } });
    fireEvent.input(inputPhone, { target: { value: '(00) 00000-0000' } });

    const form = getByTestId('form-create-user');
    const button = getByTestId('button-submit-user');

    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[User] Create user',
      entity: {
        user_name: 'Scott',
        user_email: 'email@email.com.br',
        user_phone: '(00) 00000-0000'
      }
    });

    expect(form).toHaveFormValues({
      name: 'Scott',
      email: 'email@email.com.br',
      phone: '(00) 00000-0000'
    });
  });
});

const renderCreateUser = async (errorMessage: string | null = null, created: boolean = false, routerMock: jest.Mock = jest.fn()) => {
  const selectorLoadingUserMock = {
    selector: GetLoadingUser,
    value: 'false',
  };

  const selectorErrorUserMock = {
    selector: GetErrorUser,
    value: errorMessage,
  };

  const selectorUserCreatedMock = {
    selector: UserCreated,
    value: created,
  };

  return render(CreateUserComponent, {
    declarations: [PresentErrorPipe, PhoneDirective],
    imports: [ReactiveFormsModule],
    providers: [
      {
        provide: Router,
        useValue: { navigate: routerMock }
      },
      provideMockStore({ selectors: [selectorLoadingUserMock, selectorErrorUserMock, selectorUserCreatedMock] })
    ],
  })
}
