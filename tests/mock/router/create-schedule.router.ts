import { fixture } from "../../config/fixture";
import { createBulletsSuccess, createScheduleSuccess } from "../asserts/create-schedule.assert";

export const mockingBullets = async (response: string) => {
  await fixture.page.route('**/api/v1/bullets', route => {
    const routeFulfill: { [key: string]: Promise<void> } = {
      'success': route.fulfill(createBulletsSuccess),
      'error': route.fulfill({ status: 500, json: { message: "Internal server error" } }),
      'empty': route.fulfill({ status: 200, json: [] }),
    }

    routeFulfill[response];
  });
}

export const mockingSchedule = async (response: string) => {
  await fixture.page.route('**/api/v1/schedule/appointment', route => {
    const routeFulfill: { [key: string]: Promise<void> } = {
      'success': route.fulfill(createScheduleSuccess),
      'error': route.fulfill({ status: 500, json: { message: "Internal server error" } }),
    }

    routeFulfill[response];
  });
}
