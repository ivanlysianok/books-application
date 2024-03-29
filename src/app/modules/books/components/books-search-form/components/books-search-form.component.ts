import { Component, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SearchParams } from '../../../models/search-params.interface';
import { ICON_DEFINITION } from '../../../../../shared/constants/icon-definition.const';
@Component({
  selector: 'app-books-search-form',
  templateUrl: './books-search-form.component.html',
  styleUrls: ['./books-search-form.component.scss'],
})
export class BooksSearchFormComponent {
  @Output() searchButtonClick = new EventEmitter<SearchParams>();

  protected formGroup;
  protected readonly ICON_DEFINITION = ICON_DEFINITION;

  constructor(private formBuilder: NonNullableFormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchTerm: this.formBuilder.control<string>('', Validators.required),
    });
  }

  protected searchBooks(): void {
    if (!this.formGroup.valid) {
      this.formGroup.controls.searchTerm.markAsTouched();
    }
    this.searchButtonClick.emit({
      searchTerm: this.formGroup.controls.searchTerm.value,
      startIndex: 0,
    });
  }
}
