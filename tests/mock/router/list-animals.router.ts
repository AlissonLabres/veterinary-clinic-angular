import { mockingListUsers } from './list-users.router';
import { fixture } from '../../config/fixture';
import {
  listAnimalsError,
  listAnimalsSuccess,
} from '../asserts/list-animals.assert';

export const mockingListAnimals = async (response: string) => {
  await mockingListUsers('success');
  await fixture.page.route('**/api/v1/animal/1', (route) => {
    const routeFulfill: { [key: string]: () => Promise<void> } = {
      success: () => route.fulfill(listAnimalsSuccess),
      error: () => route.fulfill(listAnimalsError),
      empty: () => route.fulfill({ status: 200, json: { animals: [] } }),
    };

    routeFulfill[response]();
  });
};
