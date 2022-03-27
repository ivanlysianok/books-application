import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display-list-items',
  templateUrl: './display-list-items.component.html',
})
export class DisplayListItems implements OnChanges {
  @Input() header = '';
  @Input() list: string[] | undefined;
  @Input() itemsCount = 0;

  ngOnChanges(): void {
    if (this.itemsCount && this.list?.length) {
      this.list = this.list.filter((x, i) => i < this.itemsCount);
    }
  }
}
