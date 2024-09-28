import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { mockingListAnimals } from '../mock/router/list-animals.router';
import {
  clickButtonActionAnimal,
  clickButtonClients,
  getTextEmptyListAnimal,
  getTextFromTableAnimal,
  getTextFromViewAnimal,
  goToDefaultPage,
  waitForURLAnimals,
  waitForURLUsers,
} from '../page-objects/list-animals.page-object';
import { accessibilityScan } from '../config/accessibility';

Given('I am on the animals page', async () => {
  await goToDefaultPage();
  await clickButtonClients();
  await waitForURLUsers();
  await clickButtonActionAnimal();
  await waitForURLAnimals();
  await accessibilityScan();
});

Given(
  'I mocking the response {string} from the API animals endpoint',
  async (response) => {
    await mockingListAnimals(response);
  }
);

Then('I should see the following animals', async ({ rawTable }) => {
  const tables = await getTextFromTableAnimal(rawTable);
  const values = await getTextFromViewAnimal(tables.length);

  tables.forEach((table, index) => {
    expect(values[index].name?.trim()).toEqual(table.name);
    expect(values[index].type?.trim()).toEqual(table.type);
    expect(values[index].age?.trim()).toEqual(table.age);
  });
});

Then('I should see empty animals list', async () => {
  const text = await getTextEmptyListAnimal();
  expect(text?.trim()).toEqual('Nenhum animal encontrado');
});
