import { Component, Input } from '@angular/core';
import { Images } from '../../../constants/images.consrant';
import { Volume } from '../../../models/volumes.interface';

@Component({
  selector: 'app-volume-cover',
  templateUrl: './volume-cover.component.html',
  styleUrls: ['./volume-cover.component.scss'],
})
export class VolumeCoverComponent {
  @Input() volume: Volume | null = null;
  @Input() detailedView: boolean | undefined = false;

  public imagePlaceholder = Images.bookCoverPlaceholder;
}
