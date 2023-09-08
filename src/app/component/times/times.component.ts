import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent {
  @Input() bulletsTimeAvailable!: string[];

  constructor() { }

}
