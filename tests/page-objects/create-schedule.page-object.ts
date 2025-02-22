import { fixture } from '../config/fixture';

export const goToDefaultPage = async () => {
  await fixture.page.goto("http://localhost:4200/");
};

export const waitForURLCalendar = async () => {
  await fixture.page.waitForURL('**/schedule/create');
};

export const selectDate = async () => {
  const date = new Date();

  await fixture.page.getByTestId(`day-${date.getDate()}`).click();
  // await fixture.page.waitForTimeout(1000);
};

export const selectTime = async () => {
  await fixture.page.getByTestId('time').click();
};

export const selectUser = async () => {
  await fixture.page.getByTestId('button-select-user-0').click();
};

export const clickButton = async (selectorButton: string) => {
  await fixture.page.getByTestId(selectorButton).click();
};

export const getUrl = async () => {
  return fixture.page.url();
};

export const waitForResponseCreateSchedule = async () => {
  await fixture.page.waitForURL('**/schedule');
};
