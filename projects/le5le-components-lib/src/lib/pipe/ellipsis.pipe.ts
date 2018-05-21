import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLen: number): any {
    maxLen = maxLen > 0 ? maxLen : 200;
    if (value.length > maxLen) {
      return value.substr(0, maxLen) + '...';
    } else {
      return value;
    }
  }
}
