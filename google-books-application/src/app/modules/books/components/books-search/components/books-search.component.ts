import { Component, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SearchParams } from '../../../models/search-params.interface';
import { SEARCH_CATEGORIES } from '../constants/search-categories.const';
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  protected formGroup: FormGroup;
  protected searchCategories: string[] = SEARCH_CATEGORIES;

  @Output() searchButtonClick: EventEmitter<SearchParams | null> =
    new EventEmitter<SearchParams | null>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchTerm: new FormControl('', Validators.required),
      category: new FormControl(''),
      orderBy: new FormControl(''),
    });
  }

  protected get searchTerm(): AbstractControl<string> {
    return this.formGroup.get('searchTerm') as AbstractControl<string>;
  }

  protected onSearch(): void {
    if (this.formGroup.invalid) {
      this.searchTerm.markAsTouched();
      return;
    }
    this.searchButtonClick.emit(this.formGroup.value);
  }
}
