import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'present'
})
export class PresentErrorPipe implements PipeTransform {

  transform(value: any, messages: { [message: string]: { message: string }}): string {
    const keys = Object.keys(value || {});
    return keys.length > 0 ? messages[keys[0]].message : '';
  }

}
