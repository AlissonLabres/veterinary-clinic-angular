import { Observable } from "rxjs";
import { CalendarEntity } from "../entity/calendar.entity";

export interface CalendarGatewayInterface {

  get(): Observable<CalendarEntity>;

  previous(): Observable<CalendarEntity>;

  next(): Observable<CalendarEntity>;

}
