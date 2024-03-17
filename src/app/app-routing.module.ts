import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulesComponent } from './web/component/schedules/schedules.component';
import { CalendarComponent } from './web/component/calendar/calendar.component';
import { CreateUserComponent } from './web/component/create-user/create-user.component';
import { ListUserComponent } from './web/component/list-user/list-user.component';
import { CreateAnimalComponent } from './web/component/create-animal/create-animal.component';

const routes: Routes = [
  { path: 'schedule', component: SchedulesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'users', component: ListUserComponent },
  { path: 'users/:id/animals/create', component: CreateAnimalComponent },
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
