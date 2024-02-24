import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phone]'
})
export class PhoneDirective {

  constructor(
    private readonly elementRef: ElementRef,
    private readonly ngControl: NgControl
  ) { }

  @HostListener('keyup') onKeyUp() {
    const value = this.elementRef.nativeElement.value;
    this.ngControl.control?.setValue(this.formatPhone(value));
  }

  private formatPhone(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length < 3) {
      return numbers.replace(/(\d{1,2})/, '($1');
    }

    if (numbers.length < 8) {
      return numbers.replace(/(\d{1,2})(\d{0,5})/, '($1) $2');
    }

    return numbers.replace(/(\d{1,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
  }
}
