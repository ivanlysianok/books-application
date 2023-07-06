import { Component, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { SearchParams } from '../../../models/search-params.interface';
import { SEARCH_CATEGORIES } from '../../../constants/search-categories.const';
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  /**
   * Emits form data after user clicked on search button
   */
  @Output() searchButtonClick = new EventEmitter<SearchParams>();

  /**
   * Form group to get search query from user
   */
  protected formGroup;
  /**
   * Avalible search categories
   */
  protected SEARCH_CATEGORIES = SEARCH_CATEGORIES;

  constructor(private formBuilder: NonNullableFormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchTerm: this.formBuilder.control<string>('', Validators.required),
      category: this.formBuilder.control<string>(''),
      orderBy: this.formBuilder.control<string>(''),
    });
  }

  /**
   * Fire books searching and emit data to searchButtonClick
   */
  protected searchBooks(): void {
    if (!this.formGroup.valid) {
      this.formGroup.controls.searchTerm.markAsTouched();
    }
    this.searchButtonClick.emit({
      searchTerm: this.formGroup.controls.searchTerm.value,
      category: this.formGroup.controls.category.value,
      orderBy: this.formGroup.controls.orderBy.value,
      startIndex: 0,
    });
  }
}
