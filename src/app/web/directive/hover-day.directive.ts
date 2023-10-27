import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hover-day]'
})
export class HoverDayDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.iteratorTo('add');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.iteratorTo('remove');
  }

  private iteratorTo(action: string) {
    ['rounded-5', 'border'].forEach((hover: string) => {
      const actions: { [action: string]: Function } = {
        add: this.add,
        remove: this.remove,
      }

      return actions[action](hover, this.elementRef.nativeElement);
    })
  }

  private add(nameClass: string, nativeElement: HTMLDivElement) {
    nativeElement.classList.add(nameClass);
  }

  private remove(nameClass: string, nativeElement: HTMLDivElement) {
    nativeElement.classList.remove(nameClass)
  }
}
