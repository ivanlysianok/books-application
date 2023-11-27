import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(text = '', length = 20): string {
    return text.length > length
      ? text.substring(0, length).trim() + '...'
      : text;
  }
}
