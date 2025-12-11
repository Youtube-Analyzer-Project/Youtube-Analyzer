import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'B';
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M';
    }

    if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'K';
    }

    return value.toString();
  }
}
