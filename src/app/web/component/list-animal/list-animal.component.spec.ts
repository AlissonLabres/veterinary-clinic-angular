import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { render } from '@testing-library/angular';
import { ListAnimalComponent } from './list-animal.component';
import {
  GetAllAnimalsByUserSelector,
  GetLoadingAnimal,
} from '../../redux/animal/animal.selector';

describe('ListUserComponent', () => {
  it('should display a loading spinner when the animal data is being fetched', async () => {
    const { getByTestId } = await renderListAnimal(true, []);

    const loadingSpinner = getByTestId('loading-spinner-text');
    expect(loadingSpinner).toBeTruthy();
  });

  it('should display a list of animals when animal data has been fetched and loading is complete', async () => {
    const { getAllByTestId } = await renderListAnimal(false, [
      {
        name: 'Test',
        type: 'CAT',
        age: '5',
      },
    ]);

    const userList = getAllByTestId('list-animals');
    expect(userList.length).toBe(1);
  });

  it('should display a message indicating the list is empty when no animal data is available and loading is complete', async () => {
    const { getByTestId } = await renderListAnimal(false, []);

    const emptyListMessage = getByTestId('empty-list');
    expect(emptyListMessage.textContent?.trim()).toEqual(
      'Nenhum animal encontrado'
    );
  });
});

const renderListAnimal = async (loading: boolean, animals: any) => {
  const selectorLoadingUserMock = {
    selector: GetLoadingAnimal,
    value: loading,
  };

  const selectorErrorUserMock = {
    selector: GetAllAnimalsByUserSelector,
    value: animals,
  };

  return render(ListAnimalComponent, {
    imports: [],
    providers: [
      { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } },
      provideMockStore({
        selectors: [selectorLoadingUserMock, selectorErrorUserMock],
      }),
    ],
  });
};
