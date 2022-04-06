import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display-volume-item',
  templateUrl: './display-volume-item.component.html',
})
export class DisplayVolumeItem implements OnChanges {
  @Input() header = '';
  @Input() displayList: string[] | undefined;
  @Input() displayItem: string | number | undefined;
  @Input() itemsCount = 0;

  // TODO - create one base component that will be extended
  // for display-list-component and display-item-component

  ngOnChanges(): void {
    if (this.displayList?.length && this.itemsCount) {
      this.displayList = this.displayList.filter((x, i) => i < this.itemsCount);
    }
  }
}
