import { fixture } from "../config/fixture";
import { emptyList, fieldEmail, fieldName, fieldPhone } from "../selectors/list-users.selector";

export const goToUsersPage = async () => {
  await fixture.page.goto("http://localhost:4200/users");
}

export const getTextFromTable = async (tables: Array<string>) => {
  return tables.map((row) => {
    const [name, email, phone] = row;
    return { name, email, phone }
  });
}

export const getTextFromView = async (length: number) => {
  const texts = [];

  for (let index = 0; index < length; index++) {
    const name = await fixture.page.getByTestId(`${fieldName}-${index}`).textContent();
    const email = await fixture.page.getByTestId(`${fieldEmail}-${index}`).textContent();
    const phone = await fixture.page.getByTestId(`${fieldPhone}-${index}`).textContent();

    texts.push({ name, email, phone });
  }

  return texts;
}

export const getTextEmptyList = async () => {
  return fixture.page.getByTestId(emptyList).textContent();
}
