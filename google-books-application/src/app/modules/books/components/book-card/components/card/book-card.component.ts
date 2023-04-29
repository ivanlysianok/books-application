import { Component, Input } from '@angular/core';
import { BookItem } from '../../../../models/book-item.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  /**
   * Book item from books collection
   */
  @Input() bookItem: BookItem | null = null;

  /**
   * Opens specific book detail page by book ID
   */
  protected openBookDetailPage(): void {
    if (!this.bookItem?.id) {
      return;
    }
    window.open(`${location.origin}/book-detail/${this.bookItem.id}`, '_blank');
  }
}
