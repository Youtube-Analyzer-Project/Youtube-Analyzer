import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToWords'
})
export class CamelCaseToWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const result = value.replace(/([a-z])([A-Z])/g, '$1 $2');

    return result
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
