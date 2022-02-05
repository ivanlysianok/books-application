import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss']
})
export class NavigateBackComponent {
  @Input() header = '';
  @Output() backButtonClicked = new EventEmitter();

  navigateBack(): void {
    this.backButtonClicked.emit();
  }
}
