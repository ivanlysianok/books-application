import { Component, Input, OnChanges } from '@angular/core';
import { ImageUrls } from '../../constants/image-urls.contant';
import { VolumeInfo } from '../../models/volumeInfo/volume-info.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnChanges {
  @Input() volumeInfo: VolumeInfo | null = null;
  @Input() volumeId: string | null = null;

  public imagePlaceholder = ImageUrls.bookCoverPlaceholder;
  public authors: string[] = [];
  public firstCategory: string | undefined;

  ngOnChanges(): void {
    if (this.volumeInfo) {
      // For design reasons only first 2 authors are displayed
      if (this.volumeInfo.authors) {
        this.volumeInfo.authors.forEach((author, index) => {
          if (index <= 1) {
            this.authors.push(author);
          }
        });
      }
      this.firstCategory = this.volumeInfo.categories
        ? this.volumeInfo.categories[0]
        : '';
    }
  }
}
