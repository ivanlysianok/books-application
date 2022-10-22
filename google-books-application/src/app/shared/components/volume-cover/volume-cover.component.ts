import { Component, Input } from '@angular/core';
import { Volume } from 'src/app/modules/books/models/volumes.interface';

@Component({
  selector: 'app-volume-cover',
  templateUrl: './volume-cover.component.html',
  styleUrls: ['./volume-cover.component.scss'],
})
export class VolumeCoverComponent {
  @Input() volume: Volume | null = null;
  @Input() detailedView = false;

  public placeholderImageSrc =
    'http://placehold.jp/e0e0e0/ffffff/250x250.png?text=No%20image';
}
