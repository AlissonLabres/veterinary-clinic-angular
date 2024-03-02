import { fixture } from "../../config/fixture";
import { createUserSuccess, createUserError } from "../asserts/create-user.assert";

export const mockingCreateUser = async (response: string) => {
  await fixture.page.route('**/api/v1/user', route => {
    route.fulfill(response === 'success' ? createUserSuccess : createUserError);
  });
}
