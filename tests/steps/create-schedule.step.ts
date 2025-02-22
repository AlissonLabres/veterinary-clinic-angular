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
  selectUser,
  waitForResponseCreateSchedule,
  waitForURLCalendar,
} from '../page-objects/create-schedule.page-object';
import {
  buttonCreateSchedule,
  buttonSchedule,
} from '../selectors/create-schedule.step';
import { accessibilityScan } from '../config/accessibility';

Given(
  'que estou simulando as respostas com {string} da solicitação',
  async (response) => {
    await mockingBullets(response);
    await mockingSchedule(response);

    await goToDefaultPage();
  }
);

Given('eu clico no botão Agendar consulta', async () => {
  await clickButton(buttonSchedule);
});


When('estou na página de criar agendamento', async () => {
  await waitForURLCalendar();
  await accessibilityScan();
});

When('eu seleciono uma data', async () => {
  await selectDate();
});

When('eu seleciono uma hora', async () => {
  await selectTime();
});

When('eu seleciono um usuário', async () => {
  await selectUser();
});

When('eu clico no botão Enviar', async () => {
  await clickButton(buttonCreateSchedule);
});

Then('eu devo ser direcionado para a página de agendamento', async () => {
  await waitForResponseCreateSchedule();
  const url = await getUrl();

  expect(url).toContain('/schedule');
});
