import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display-list-items',
  templateUrl: './display-list-items.component.html',
})
export class DisplayListItemsComponent implements OnChanges {
  @Input() header = '';
  @Input() displayList: string[] | undefined;
  @Input() itemsCount = 0;

  ngOnChanges(): void {
    if (this.displayList?.length && this.itemsCount) {
      this.displayList = this.displayList.filter((x, i) => i < this.itemsCount);
    }
  }
}
