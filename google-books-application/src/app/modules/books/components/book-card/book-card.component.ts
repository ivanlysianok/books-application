import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Volume } from '../../models/volumes.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnChanges {
  @Input() volume: Volume | null = null;

  public firstCategory: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.volume?.volumeInfo.categories) {
        this.firstCategory = this.volume.volumeInfo.categories.shift();
        console.log(this.firstCategory)
      }
    }
  }
}
