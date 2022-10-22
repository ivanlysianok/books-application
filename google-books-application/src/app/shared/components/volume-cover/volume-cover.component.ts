import { Component, Input } from '@angular/core';
import { Images } from 'src/app/modules/books/constants/images.consrant';
import { Volume } from 'src/app/modules/books/models/volumes.interface';

@Component({
  selector: 'app-volume-cover',
  templateUrl: './volume-cover.component.html',
  styleUrls: ['./volume-cover.component.scss'],
})
export class VolumeCoverComponent {
  @Input() volume: Volume | null = null;
  @Input() detailedView = false;

  public imagePlaceholder = Images.bookCoverPlaceholder;
}
