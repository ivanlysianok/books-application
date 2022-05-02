import { Component, Input } from '@angular/core';
import { Volume } from '../../models/volumes.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() volume: Volume | null = null;

  navigateToBookDetail(volumeId: string | undefined): void {
    if (volumeId) {
      const url = location.origin + `/book-detail/${volumeId}`;
      window.open(url, '_blank');
    }
  }
}
