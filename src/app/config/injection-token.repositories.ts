import { InjectionToken } from "@angular/core";
import { CalendarRepositoryInMemoryService } from "../infraestructure/repository/in-memory/calendar-repository-in-memory.service";

export const CalendarRepositoryToken = new InjectionToken(
  "CalendarRepository",
  { providedIn: "root", factory: () => new CalendarRepositoryInMemoryService() }
);
