import { fixture } from "../../config/fixture";
import { listUsersError, listUsersSuccess } from "../asserts/list-users.assert";

export const mockingListUsers = async (response: string) => {
  await fixture.page.route('**/api/v1/users', route => {
    const routeFulfill: { [key: string]: () => Promise<void> } = {
      'success': () => route.fulfill(listUsersSuccess),
      'error': () => route.fulfill(listUsersError),
      'empty': () => route.fulfill({ status: 200, json: [] }),
    }

    routeFulfill[response]();
  });
}
