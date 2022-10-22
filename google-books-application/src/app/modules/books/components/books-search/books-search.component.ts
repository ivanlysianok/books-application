import { Component, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OrderBy } from '../../constants/order-by.constant';
import { SelectCategories } from '../../constants/volume-categories.constant';
import { SearchParams } from '../../models/search-params.interface';
import { VolumesSteps } from '../../enums/volumes-steps.enum';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  @Output() formGroupValuesEmmit = new EventEmitter<SearchParams>();

  public dataFormGroup: FormGroup;
  public categories = SelectCategories;

  constructor(private formBuilder: FormBuilder) {
    this.dataFormGroup = this.formBuilder.group({
      q: ['', Validators.required],
      subject: [''],
      orderBy: [OrderBy.relevance],
      startIndex: [VolumesSteps.Zero],
      maxResults: [VolumesSteps.BaseStep],
    });
  }

  public get q(): AbstractControl {
    return this.dataFormGroup.get('q') as AbstractControl;
  }

  public onReset(): void {
    this.q.reset();
    this.dataFormGroup.get('subject')?.reset();
  }

  public onSearch(): void {
    if (this.dataFormGroup.invalid) {
      this.q?.markAsTouched();
      return;
    }
    this.formGroupValuesEmmit.emit(this.dataFormGroup.value);
  }
}
