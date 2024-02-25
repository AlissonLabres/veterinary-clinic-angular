import { InjectionToken, inject } from "@angular/core";
import { CalendarRepositoryService } from "../infrastructure/repository/calendar-repository.service";
import { HttpClient } from "@angular/common/http";
import { UserRepositoryService } from "../infrastructure/repository/user-repository.service";

export const CalendarRepositoryToken = new InjectionToken(
  "CalendarRepository",
  { providedIn: "root", factory: () => new CalendarRepositoryService(inject(HttpClient)) }
);

export const UserRepositoryToken = new InjectionToken(
  "UserRepository",
  { providedIn: "root", factory: () => new UserRepositoryService(inject(HttpClient)) }
);
