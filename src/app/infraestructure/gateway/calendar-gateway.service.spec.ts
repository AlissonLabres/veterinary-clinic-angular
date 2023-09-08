/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarGatewayService } from './calendar-gateway.service';

describe('Service: CalendarGateway', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarGatewayService]
    });
  });

  it('should ...', inject([CalendarGatewayService], (service: CalendarGatewayService) => {
    expect(service).toBeTruthy();
  }));
});
