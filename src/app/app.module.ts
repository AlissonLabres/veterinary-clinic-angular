import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { BulletReducer } from './redux/bullet/bullet.reducer';
import { BulletEffect } from './redux/bullet/bullet.effect';

import { CalendarReducer } from './redux/calendar/calendar.reducer';
import { CalendarEffect } from './redux/calendar/calendar.effect';

import { HoverDayDirective } from './directive/hover-day.directive';
import { CalendarComponent } from './component/calendar/calendar.component';
import { DatesComponent } from './component/dates/dates.component';
import { TimesComponent } from './component/times/times.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DatesComponent,
    TimesComponent,
    HoverDayDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      bulletState: BulletReducer,
      calendarState: CalendarReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([
      BulletEffect,
      CalendarEffect
    ]),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
