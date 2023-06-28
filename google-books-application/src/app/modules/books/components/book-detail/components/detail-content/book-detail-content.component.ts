import { Component, Input, OnChanges } from '@angular/core';
import { BookItem } from '../../../../models/book-item.interface';
import { SALE_IDENTIFIER } from 'src/app/modules/books/constants/sale-identifier.const';

@Component({
  selector: 'app-book-detail-content',
  templateUrl: './book-detail-content.component.html',
  styleUrls: ['./book-detail-content.component.scss'],
})
export class BookDetailContentComponent implements OnChanges {
  /**
   * Current book item
   */
  @Input({ required: true }) bookItem: BookItem | null = null;

  /**
   * Identifier for order button
   */
  protected SALE_IDENTIFIER = SALE_IDENTIFIER;
  /**
   * Price of current book
   */
  protected bookPrice = '';

  ngOnChanges(): void {
    if (
      !this.bookItem?.saleInfo?.retailPrice?.amount ||
      !this.bookItem?.saleInfo?.retailPrice?.currencyCode
    ) {
      return;
    }
    this.bookPrice = `${this.bookItem?.saleInfo?.retailPrice.amount} ${this.bookItem.saleInfo.retailPrice.currencyCode}`;
  }

  /**
   * Opens external link
   * @param link Link to external resource
   */
  protected onExternalLinkOpen(link?: string): void {
    if (!link) {
      return;
    }
    window.location.href = link;
  }
}
