import { Component, Input, OnInit } from '@angular/core';
import { Volume } from '../../../../models/volume.interface';

@Component({
  selector: 'app-book-detail-content',
  templateUrl: './book-detail-content.component.html',
  styleUrls: ['./book-detail-content.component.scss'],
})
export class BookDetailContentComponent implements OnInit {
  @Input() volume: Volume | null = null;

  public forSaleIdentifier = 'FOR_SALE';
  public bookPrice = '';

  ngOnInit(): void {
    if (
      this.volume?.saleInfo.retailPrice.amount &&
      this.volume?.saleInfo.retailPrice.currencyCode
    ) {
      this.bookPrice = `${this.volume.saleInfo.retailPrice.amount} ${this.volume.saleInfo.retailPrice.currencyCode}`;
    }
  }

  onLinkOpen(link?: string): void {
    if (link) {
      window.location.href = link;
    }
  }
}
