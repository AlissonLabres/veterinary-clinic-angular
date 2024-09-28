import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  mockingBullets,
  mockingSchedule,
} from '../mock/router/create-schedule.router';
import {
  clickButton,
  getUrl,
  goToDefaultPage,
  selectDate,
  selectTime,
  waitForResponseCreateSchedule,
  waitForURLCalendar,
} from '../page-objects/create-schedule.page-object';
import {
  buttonCreateSchedule,
  buttonSchedule,
} from '../selectors/create-schedule.step';
import { accessibilityScan } from '../config/accessibility';

Given(
  'I mocking the responses with {string} of the request',
  async (response) => {
    await mockingBullets(response);
    await mockingSchedule(response);

    await goToDefaultPage();
  }
);

Given('I am on the schedule page', async () => {
  await waitForURLCalendar();
  await accessibilityScan();
});

When('I select a date', async () => {
  await selectDate();
});

When('I select a time', async () => {
  await selectTime();
});

When('I click on button {string}', async (button: string) => {
  let selectorButton = '';
  switch (button) {
    case 'Agendar consulta':
      selectorButton = buttonSchedule;
      break;
    case 'Enviar':
      selectorButton = buttonCreateSchedule;
      break;
  }

  await clickButton(selectorButton);
});

Then('I should navigate to the schedule page', async () => {
  await waitForResponseCreateSchedule();
  const url = await getUrl();

  expect(url).toContain('/schedule');
});
