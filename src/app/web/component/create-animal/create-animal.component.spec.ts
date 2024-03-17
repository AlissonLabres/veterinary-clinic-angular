import '@testing-library/jest-dom';

import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fireEvent, render } from '@testing-library/angular';

import { PhoneDirective } from '../../directive/phone.directive';
import { PresentErrorPipe } from '../../pipe/present-error.pipe';
import {
  GetErrorAnimal,
  GetLoadingAnimal,
  GetSuccessAnimal,
} from '../../redux/animal/animal.selector';
import { GetUserSelector } from '../../redux/user/user.selector';
import { CreateAnimalComponent } from './create-animal.component';

describe('CreateAnimalComponent', () => {
  it('should render all required input fields', async () => {
    const { getByTestId } = await renderCreateAnimal();

    expect(getByTestId('input-name')).toBeTruthy();
    expect(getByTestId('input-age')).toBeTruthy();
    expect(getByTestId('input-weight')).toBeTruthy();
    expect(getByTestId('input-type')).toBeTruthy();
    expect(getByTestId('input-breed')).toBeTruthy();
  });

  describe('should validate form and show error message when', () => {
    it('name field is empty', async () => {
      const { getByTestId } = await renderCreateAnimal();
      const input = getByTestId('input-name');

      fireEvent.input(input, { target: { value: '' } });

      expect(getByTestId('text-error-name').textContent?.trim()).toEqual(
        'This field is required'
      );
    });

    it('age field is empty', async () => {
      const { getByTestId } = await renderCreateAnimal();
      const input = getByTestId('input-age');

      fireEvent.input(input, { target: { value: -1 } });

      expect(getByTestId('text-error-age').textContent?.trim()).toEqual(
        'This field must be valid'
      );
    });

    it('weight field is empty', async () => {
      const { getByTestId } = await renderCreateAnimal();
      const input = getByTestId('input-weight');

      fireEvent.input(input, { target: { value: -1 } });

      expect(getByTestId('text-error-weight').textContent?.trim()).toEqual(
        'This field must be valid'
      );
    });

    it('type field is empty', async () => {
      const { getByTestId } = await renderCreateAnimal();
      const input = getByTestId('input-type');

      fireEvent.input(input, { target: { value: '' } });

      expect(getByTestId('text-error-type').textContent?.trim()).toEqual(
        'This field is required'
      );
    });

    it('breed field is empty', async () => {
      const { getByTestId } = await renderCreateAnimal();
      const input = getByTestId('input-breed');

      fireEvent.input(input, { target: { value: '' } });

      expect(getByTestId('text-error-breed').textContent?.trim()).toEqual(
        'This field is required'
      );
    });
  });

  it('should view error', async () => {
    const { getByTestId } = await renderCreateAnimal('Error message');
    const alert = getByTestId('alert-error');

    expect(alert.textContent?.trim()).toEqual('Error message');
  });

  it('should clean form when user created', async () => {
    const spyRouterNavigate = jest.fn().mockReturnValue(['/users/1/animals']);
    const { getByTestId } = await renderCreateAnimal(
      null,
      true,
      false,
      spyRouterNavigate
    );
    const form = getByTestId('form-create-animal');

    expect(form).toHaveFormValues({
      name: '',
      age: 0,
      weight: '0',
      type: '',
      breed: '',
    });
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/users/1/animals']);
  });

  it('should dispatch a create animal action with form values when form is submitted', async () => {
    const { getByTestId } = await renderCreateAnimal();

    const store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();

    const inputName = getByTestId('input-name');
    const inputAge = getByTestId('input-age');
    const inputWeight = getByTestId('input-weight');
    const inputType = getByTestId('input-type');
    const inputBreed = getByTestId('input-breed');

    fireEvent.input(inputName, { target: { value: 'Scott' } });
    fireEvent.input(inputAge, { target: { value: 1 } });
    fireEvent.input(inputWeight, { target: { value: 4 } });
    fireEvent.input(inputType, { target: { value: 'CAT' } });
    fireEvent.input(inputBreed, { target: { value: 'N/A' } });

    const form = getByTestId('form-create-animal');
    const button = getByTestId('button-submit-animal');

    expect(form).toHaveFormValues({
      name: 'Scott',
      age: 1,
      weight: '4',
      type: 'CAT',
      breed: 'N/A',
    });

    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Animal] Create animal',
      payload: {
        name: 'Scott',
        age: 1,
        weight: '4',
        type: 'CAT',
        breed: 'N/A',
        user_id: 1,
      },
    });
  });

  it('should view loading when selector emitter true', async () => {
    const { getByTestId } = await renderCreateAnimal(null, false, true);

    expect(getByTestId('button-submit-animal-loading')).toBeTruthy();
  });

  it('should view button submit when selector emitter false', async () => {
    const { getByTestId } = await renderCreateAnimal();

    expect(getByTestId('button-submit-animal')).toBeTruthy();
  });
});

const renderCreateAnimal = async (
  errorMessage: string | null = null,
  success: boolean = false,
  isLoading: boolean = false,
  routerMock: jest.Mock = jest.fn()
) => {
  const selectorLoadingAnimalMock = {
    selector: GetLoadingAnimal,
    value: isLoading,
  };

  const selectorErrorAnimalMock = {
    selector: GetErrorAnimal,
    value: errorMessage,
  };

  const selectorUserMock = {
    selector: GetUserSelector(1),
    value: { user_id: 1 },
  };

  const selectorSuccessAnimalMock = {
    selector: GetSuccessAnimal,
    value: success,
  };

  return render(CreateAnimalComponent, {
    declarations: [PresentErrorPipe, PhoneDirective],
    imports: [ReactiveFormsModule],
    providers: [
      {
        provide: Router,
        useValue: { navigate: routerMock },
      },
      {
        provide: ActivatedRoute,
        useValue: { params: of({ id: 1 }) },
      },
      provideMockStore({
        initialState: { userState: { entities: [{ user_id: 1 }] } },
        selectors: [
          selectorLoadingAnimalMock,
          selectorSuccessAnimalMock,
          selectorErrorAnimalMock,
          selectorUserMock,
        ],
      }),
    ],
  });
};
