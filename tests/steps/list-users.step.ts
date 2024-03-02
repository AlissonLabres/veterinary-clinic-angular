import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { mockingListUsers } from "../mock/router/list-users.router";
import { getTextFromTable, goToUsersPage, getTextEmptyList, getTextFromView } from "../page-objects/list-users.page-object";

Given("I am on the users page", async () => {
  await goToUsersPage();
});

Given("I mocking the response {string} from the API users endpoint", async (response) => {
  await mockingListUsers(response);
});

Then("I should see the following users", async ({ rawTable }) => {
  const tables = await getTextFromTable(rawTable);
  const values = await getTextFromView(tables.length);

  tables.forEach((table, index) => {
    expect(values[index].name).toEqual(table.name);
    expect(values[index].email).toEqual(table.email);
    expect(values[index].phone).toEqual(table.phone);
  });
});

Then("I should see empty users list", async () => {
  const text = await getTextEmptyList();
  expect(text?.trim()).toEqual("Nenhum usuário encontrado");
});
