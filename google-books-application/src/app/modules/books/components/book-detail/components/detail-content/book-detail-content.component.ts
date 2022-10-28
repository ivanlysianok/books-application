import { Component, Input, OnChanges } from '@angular/core';
import { Volume } from '../../../../models/volume.interface';

@Component({
  selector: 'app-book-detail-content',
  templateUrl: './book-detail-content.component.html',
  styleUrls: ['./book-detail-content.component.scss'],
})
export class BookDetailContentComponent implements OnChanges {
  @Input() volume: Volume | null = null;

  protected forSaleIdentifier = 'FOR_SALE';
  protected bookPrice = '';

  ngOnChanges(): void {
    if (
      !this.volume?.saleInfo?.retailPrice?.amount ||
      !this.volume?.saleInfo?.retailPrice?.currencyCode
    ) {
      return;
    }
    this.bookPrice = `${this.volume?.saleInfo?.retailPrice.amount} ${this.volume.saleInfo.retailPrice.currencyCode}`;
  }

  protected onExternalLinkOpen(link?: string): void {
    if (link) {
      window.location.href = link;
    }
  }
}
