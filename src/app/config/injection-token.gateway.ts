import { InjectionToken } from "@angular/core";
import { CalendarGatewayService } from "../infrastructure/gateway/calendar-gateway.service";

export const CalendarGatewayToken = new InjectionToken(
  "CalendarGateway",
  { providedIn: "root", factory: () => new CalendarGatewayService() }
);
