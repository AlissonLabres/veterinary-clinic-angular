import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent {
  @Input() bulletsTimeAvailable!: string[];
  @Output() bullet: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  select(value: string) {
    this.bullet.emit(value);
  }
}
