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
  public firstCategory: string | null = null;

  ngOnChanges(): void {
    if (this.volumeInfo) {
      this.authors = this.volumeInfo?.authors ? this.volumeInfo.authors : [];
      this.firstCategory = this.volumeInfo?.categories
        ? this.volumeInfo?.categories[0]
        : null;
    }
  }
}
