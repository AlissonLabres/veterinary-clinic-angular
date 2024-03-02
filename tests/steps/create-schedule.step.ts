import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { mockingBullets, mockingSchedule } from "../mock/router/create-schedule.router";
import { clickButton, getUrl, goToCreateSchedule, selectDate, selectTime, waitForResponseCreateSchedule } from "../page-objects/create-schedule.page-object";

Given("I mocking the responses with {string} of the request", async (response) => {
  await mockingBullets(response);
  await mockingSchedule(response);
});

Given("I am on the schedule page", async () => {
  await goToCreateSchedule();
});

When("I select a date", async () => {
  await selectDate();
});

When("I select a time", async () => {
  await selectTime();
});

When("I click on button", async () => {
  await clickButton();
});

Then("I should navigate to the schedule page", async () => {
  await waitForResponseCreateSchedule();
  const url = await getUrl();

  expect(url).toContain("/schedule");
});
