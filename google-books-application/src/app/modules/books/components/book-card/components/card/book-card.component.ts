import { Component, Input, OnInit } from '@angular/core';
import { BookItem } from '../../../../models/book-item.interface';
import { VolumeInfo } from '../../../../models/volumeInfo/volume-info.interface';
import { CARD_IMAGE_PLACEHOLDER } from '../../../../constants/card-image-placeholder.const';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailDialogComponent } from '../../../book-detail-dialog/book-detail-dialog.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input({ required: true }) bookItem: BookItem | null = null;

  protected bookVolume: VolumeInfo | null = null;
  protected bookImageSource = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.bookItem) {
      return;
    }
    this.bookVolume = this.bookItem.volumeInfo;
    this.getCardImageSource();
  }

  private getCardImageSource(): void {
    if (!this.bookVolume) {
      return;
    }
    this.bookImageSource =
      this.bookVolume.imageLinks?.thumbnail ||
      this.bookVolume.imageLinks?.smallThumbnail ||
      CARD_IMAGE_PLACEHOLDER;
  }

  // TODO: Instead of dialog, open this book in official Google books page.
  protected onOpenDetailDialog(): void {
    this.dialog.open<BookDetailDialogComponent>(BookDetailDialogComponent, {
      data: this.bookVolume,
    });
  }
}
