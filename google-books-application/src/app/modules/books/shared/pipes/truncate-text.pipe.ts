import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(text = '', length = 20, ellipsis = '...'): string {
    if (text.length > length) {
      return text.substring(0, length).trim() + ellipsis;
    }
    return text;
  }
}
