import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
})
export class DisplayItemComponent {
  @Input() header = '';
  @Input() displayItem: string | number | undefined;
}
