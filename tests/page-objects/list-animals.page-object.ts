import { fixture } from '../config/fixture';
import {
  emptyList,
  fieldAge,
  fieldName,
  fieldType,
} from '../selectors/list-animals.selector';

export const goToDefaultPage = async () => {
  await fixture.page.goto('http://localhost:4200/');
};

export const waitForURLUsers = async () => {
  await fixture.page.waitForURL('**/users');
};

export const waitForURLAnimals = async () => {
  await fixture.page.waitForURL('**/users/1/animals');
};

export const clickButtonClients = async () => {
  await fixture.page.getByTestId('button-navigate-clients').click();
};

export const clickButtonActionAnimal = async () => {
  await fixture.page.getByTestId('action-button-0').click();
  await fixture.page.waitForTimeout(100);
  await fixture.page.getByTestId('action-button-drop-0').click();
};

export const getTextFromTableAnimal = async (tables: Array<string>) => {
  return tables.map((row) => {
    const [name, type, age] = row;
    return { name, type, age };
  });
};

export const getTextFromViewAnimal = async (length: number) => {
  const texts = [];

  for (let index = 0; index < length; index++) {
    const name = await fixture.page
      .getByTestId(`${fieldName}-${index}`)
      .textContent();
    const type = await fixture.page
      .getByTestId(`${fieldType}-${index}`)
      .textContent();
    const age = await fixture.page
      .getByTestId(`${fieldAge}-${index}`)
      .textContent();

    texts.push({ name, type, age });
  }

  return texts;
};

export const getTextEmptyListAnimal = async () => {
  return fixture.page.getByTestId(emptyList).textContent();
};
