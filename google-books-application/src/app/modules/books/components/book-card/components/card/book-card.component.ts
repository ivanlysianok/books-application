import { Component, Input } from '@angular/core';
import { Volume } from '../../../../models/volume.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() volume: Volume | null = null;

  protected openBookDetailPage(): void {
    if (this.volume?.id) {
      const url = location.origin + `/book-detail/${this.volume.id}`;
      window.open(url, '_blank');
    }
  }
}
