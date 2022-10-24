import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
})
export class PaginationButtonComponent {
  @Input() isDisabled = false;
  @Output() buttonClick = new EventEmitter();

  protected onButtonClick(): void {
    this.buttonClick.emit();
  }
}
