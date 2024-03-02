import { fixture } from "../config/fixture";

export const goToCreateSchedule = async () => {
  await fixture.page.goto("http://localhost:4200/calendar");
};

export const selectDate = async () => {
  const date = new Date();

  await fixture.page.getByTestId(`day-${date.getDate()}`).click();
  await fixture.page.waitForTimeout(1000);
}

export const selectTime = async () => {
  await fixture.page.getByTestId("time").click();
}

export const clickButton = async () => {
  await fixture.page.getByTestId("send-bullet").click();
}

export const getUrl = async () => {
  return fixture.page.url();
}

export const waitForResponseCreateSchedule = async () => {
  await fixture.page.waitForURL('**/schedule');
}
