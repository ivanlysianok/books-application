import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VolumeInfo } from '../../../../models/volumeInfo/volume-info.interface';

@Component({
  selector: 'app-book-card-content',
  templateUrl: './book-card-content.component.html',
  styleUrls: ['./book-card-content.component.scss'],
})
export class BookCardContentComponent {
  @Input() volumeInfo: VolumeInfo | null = null;

  @Output() detailButtonClick: EventEmitter<unknown> =
    new EventEmitter<unknown>();

  protected onDetailButtonClick(): void {
    this.detailButtonClick.emit();
  }
}
