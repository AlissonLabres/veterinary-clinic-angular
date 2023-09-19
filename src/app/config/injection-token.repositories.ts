import { InjectionToken, inject } from "@angular/core";
import { CalendarRepositoryServerService } from "../infraestructure/repository/server/calendar-repository-server.service.ts.service";
import { HttpClient } from "@angular/common/http";

export const CalendarRepositoryToken = new InjectionToken(
  "CalendarRepository",
  { providedIn: "root", factory: () => new CalendarRepositoryServerService(inject(HttpClient)) }
);
