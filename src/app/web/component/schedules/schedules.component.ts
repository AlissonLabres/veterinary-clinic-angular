import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { CancelSchedule, GetSchedules } from '../../redux/schedule/schedule.action';
import { GetLoadingSchedule, GetScheduleSelector } from '../../redux/schedule/schedule.selector';

type ScheduleInterface = {
  schedule_id: number,
  schedule_status: string,
  bullet_code: string,
  type_service: string
};

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  @ViewChild('modalCancelTemplate', { static: true }) modalCancelTemplate?: ElementRef;

  store: Store = inject(Store);

  $schedules = this.store.pipe(select(GetScheduleSelector));
  loadingCancel$ = this.store.pipe(select(GetLoadingSchedule));

  modalTemplate?: Modal;
  scheduleSelectedToCancel?: ScheduleInterface = undefined;

  ngOnInit(): void {
    this.store.dispatch(GetSchedules());
  }

  viewButtonCancelSchedule(schedule: ScheduleInterface) {
    return schedule.schedule_status.toLocaleUpperCase() === 'SCHEDULED';
  }

  cancelSchedule(schedule: ScheduleInterface) {
    if (this.modalCancelTemplate?.nativeElement) {
      this.scheduleSelectedToCancel = schedule;

      this.modalTemplate = new Modal(this.modalCancelTemplate?.nativeElement, {})
      this.modalTemplate?.toggle();
    }
  }

  confirmCancelSchedule() {
    const schedule_id = this.scheduleSelectedToCancel?.schedule_id;
    if (schedule_id) {
      this.store.dispatch(CancelSchedule({ schedule_id }));
      this.modalTemplate?.toggle();
    }
  }
}
