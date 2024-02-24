import { InjectionToken, inject } from "@angular/core";
import { CalendarRepositoryServerService } from "../infrastructure/repository/server/calendar-repository-server.service";
import { HttpClient } from "@angular/common/http";
import { UserRepositoryServerService } from "../infrastructure/repository/server/user-repository-server.service";

export const CalendarRepositoryToken = new InjectionToken(
  "CalendarRepository",
  { providedIn: "root", factory: () => new CalendarRepositoryServerService(inject(HttpClient)) }
);

export const UserRepositoryToken = new InjectionToken(
  "UserRepository",
  { providedIn: "root", factory: () => new UserRepositoryServerService(inject(HttpClient)) }
);
