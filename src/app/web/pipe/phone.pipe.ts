import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string | undefined): any {
    if(!value) return value;

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
