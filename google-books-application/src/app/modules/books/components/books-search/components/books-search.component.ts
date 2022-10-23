import { Component, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SearchParams } from '../../../models/search-params.interface';
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  public formGroup: FormGroup;
  public searchCategories: string[] = [
    'All',
    'Art',
    'Biography',
    'Computers',
    'History',
    'Medical',
    'Poetry',
  ];

  @Output() searchButtonClick: EventEmitter<SearchParams | null> =
    new EventEmitter<SearchParams | null>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchTerm: ['', Validators.required],
      category: [''],
      orderBy: [''],
    });
  }

  public get searchTerm(): AbstractControl {
    return this.formGroup.get('searchTerm') as AbstractControl;
  }

  public onSearch(): void {
    if (this.formGroup.invalid) {
      this.searchTerm.markAsTouched();
      return;
    }
    this.searchButtonClick.emit(this.formGroup.value);
  }
}
