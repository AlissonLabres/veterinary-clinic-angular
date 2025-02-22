import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './web/component/calendar/calendar.component';
import { CreateAnimalComponent } from './web/component/create-animal/create-animal.component';
import { ListAnimalComponent } from './web/component/list-animal/list-animal.component';
import { CreateUserComponent } from './web/component/create-user/create-user.component';
import { DatesComponent } from './web/component/dates/dates.component';
import { ListUserComponent } from './web/component/list-user/list-user.component';
import { SchedulesComponent } from './web/component/schedules/schedules.component';
import { TimesComponent } from './web/component/times/times.component';
import { HoverDayDirective } from './web/directive/hover-day.directive';
import { PhoneDirective } from './web/directive/phone.directive';
import { PhonePipe } from './web/pipe/phone.pipe';
import { PresentErrorPipe } from './web/pipe/present-error.pipe';
import { AnimalEffect } from './web/redux/animal/animal.effect';
import { AnimalReducer } from './web/redux/animal/animal.reduce';
import { BulletEffect } from './web/redux/bullet/bullet.effect';
import { BulletReducer } from './web/redux/bullet/bullet.reducer';
import { CalendarEffect } from './web/redux/calendar/calendar.effect';
import { CalendarReducer } from './web/redux/calendar/calendar.reducer';
import { ScheduleEffect } from './web/redux/schedule/schedule.effect';
import { ScheduleReducer } from './web/redux/schedule/schedule.reducer';
import { UserEffect } from './web/redux/user/user.effect';
import { UserReducer } from './web/redux/user/user.reducer';
import { CreateScheduleComponent } from './web/component/create-schedule/create-schedule.component';
import { ProgressStepComponent } from './web/component/create-schedule/progress-step/progress-step.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateScheduleComponent,
    ProgressStepComponent,
    CalendarComponent,
    DatesComponent,
    TimesComponent,
    SchedulesComponent,
    CreateUserComponent,
    CreateAnimalComponent,
    ListUserComponent,
    ListAnimalComponent,
    HoverDayDirective,
    PhoneDirective,
    PhonePipe,
    PresentErrorPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      scheduleState: ScheduleReducer,
      bulletState: BulletReducer,
      calendarState: CalendarReducer,
      userState: UserReducer,
      animalState: AnimalReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([
      ScheduleEffect,
      BulletEffect,
      CalendarEffect,
      UserEffect,
      AnimalEffect,
    ]),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
