import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-step',
  templateUrl: './progress-step.component.html',
  styleUrls: ['./progress-step.component.scss'],
})
export class ProgressStepComponent {
  @Input() quantitySteps: number[] = [];
  @Input() stepper: number[] = [];
  @Input() stepActive: number = 1;

  @Output() previousStep: EventEmitter<void> = new EventEmitter();
  @Output() nextStep: EventEmitter<void> = new EventEmitter();

  isStep(index: number) {
    return this.stepper.includes(index);
  }

  previous() {
    this.previousStep.next();
  }

  next() {
    this.nextStep.next();
  }
}
