import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Volume } from '../../models/volumes.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnChanges {
  @Input() volume: Volume | null = null;

  public title: string | null = null;
  public category: string | null = null;
  public authors: string[] = [];

  ngOnChanges(): void {
    if (this.volume) {
      this.title = this.volume.volumeInfo.title ? this.volume.volumeInfo.title : null;
      this.category = this.volume.volumeInfo.categories
        ? this.volume.volumeInfo.categories[0]
        : null;
      this.authors = this.volume.volumeInfo.authors ? this.volume.volumeInfo.authors : [];
    }
  }
}
