import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { BulletReducer } from './web/redux/bullet/bullet.reducer';
import { BulletEffect } from './web/redux/bullet/bullet.effect';

import { CalendarReducer } from './web/redux/calendar/calendar.reducer';
import { CalendarEffect } from './web/redux/calendar/calendar.effect';

import { ScheduleReducer } from './web/redux/schedule/schedule.reducer';
import { ScheduleEffect } from './web/redux/schedule/schedule.effect';
import { SchedulesComponent } from './web/component/schedules/schedules.component';

import { HoverDayDirective } from './web/directive/hover-day.directive';

import { CalendarComponent } from './web/component/calendar/calendar.component';
import { DatesComponent } from './web/component/dates/dates.component';
import { TimesComponent } from './web/component/times/times.component';
import { CreateUserComponent } from './web/component/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneDirective } from './web/directive/phone.directive';
import { PresentErrorPipe } from './web/pipe/present-error.pipe';
import { UserReducer } from './web/redux/user/user.reducer';
import { UserEffect } from './web/redux/user/user.effect';
import { ListUserComponent } from './web/component/list-user/list-user.component';
import { PhonePipe } from './web/pipe/phone.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DatesComponent,
    TimesComponent,
    SchedulesComponent,
    CreateUserComponent,
    ListUserComponent,
    HoverDayDirective,
    PhoneDirective,
    PhonePipe,
    PresentErrorPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      scheduleState: ScheduleReducer,
      bulletState: BulletReducer,
      calendarState: CalendarReducer,
      userState: UserReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([
      ScheduleEffect,
      BulletEffect,
      CalendarEffect,
      UserEffect
    ]),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
