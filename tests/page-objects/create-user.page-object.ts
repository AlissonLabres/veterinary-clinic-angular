import { fixture } from '../config/fixture';
import {
  inputName,
  inputEmail,
  inputPhone,
  buttonSubmitUser,
  alertError,
} from '../selectors/create-user.selector';

export const fillInput = async (field: string, value: string) => {
  switch (field) {
    case 'Name':
      await fixture.page.getByTestId(inputName).pressSequentially(value);
      break;
    case 'Email':
      await fixture.page.getByTestId(inputEmail).pressSequentially(value);
      break;
    case 'Phone':
      await fixture.page.getByTestId(inputPhone).pressSequentially(value);
      break;
  }
};

export const goToDefaultPage = async () => {
  await fixture.page.goto('http://localhost:4200/');
};

export const waitForURLUsers = async () => {
  await fixture.page.waitForURL('**/users');
};

export const waitForURLUsersCreate = async () => {
  await fixture.page.waitForURL('**/users/create');
};

export const clickButtonClients = async () => {
  await fixture.page.getByTestId('button-navigate-clients').click();
};

export const clickButtonCreateCliente = async () => {
  await fixture.page.getByTestId('button-navigate-user-create').click();
};

export const submit = async () => {
  await fixture.page.getByTestId(buttonSubmitUser).click();
};

export const getTextError = async () => {
  return fixture.page.getByTestId(alertError).textContent();
};

export const getUrl = async () => {
  return fixture.page.url();
};

export const waitForResponseCreateUser = async () => {
  await fixture.page.waitForURL('**/users');
};
