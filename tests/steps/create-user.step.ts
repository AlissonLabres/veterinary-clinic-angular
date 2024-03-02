import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fillInput, getTextError, getUrl, goToCreateUserPage, submit, waitForResponseCreateUser } from "../page-objects/create-user.page-object";
import { mockingCreateUser } from "../mock/router/create-user.router";

Given("I am on the create user page", () => {
  goToCreateUserPage();
});

Given("I mocking the response with {string} of the request to create a user", async (response) => {
  await mockingCreateUser(response);
});

When("I fill in {string} with {string}", async (field, value) => {
  await fillInput(field, value);
});

When("I click button", async () => {
  await submit();
});

Then("I should navigate to the list users page", async () => {
  await waitForResponseCreateUser();
  const url = await getUrl();

  expect(url).toContain("/users");
});

Then("I should see {string}", async (message) => {
  const text = await getTextError();

  expect(text?.trim()).toBe(message);
});

Then("I should not navigate to the list users page", async () => {
  const url = await getUrl();

  expect(url).toContain("/users/create");
});
