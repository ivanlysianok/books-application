import { Component, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CollectionResultModel } from 'src/app/shared/models/collection-result.intereface';
import { OrderBy } from '../../constants/order-by.constant';
import { SelectCategories } from '../../constants/volume-categories.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { LoaderService } from '../../shared/services/loader.service';
import { SearchParams } from '../../models/search-params.interface';
import { VolumesSteps } from '../../enums/volumes-steps.enum';
import { NotificationService } from '../../shared/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  @Output() volumesEmmiter = new EventEmitter<
    CollectionResultModel<Volume[]>
  >();

  public dataFormGroup: FormGroup;
  public categories = SelectCategories;
  public searchParams: SearchParams | null = null;

  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
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

  public get subject(): AbstractControl {
    return this.dataFormGroup.get('subject') as AbstractControl;
  }

  public get orderBy(): AbstractControl {
    return this.dataFormGroup.get('orderBy') as AbstractControl;
  }

  public onReset(): void {
    this.q.reset();
    this.subject.reset();
    this.orderBy.reset();
  }

  public onSearch(): void {
    if (this.dataFormGroup.invalid) {
      this.q?.markAsTouched();
      return;
    }
    if (this.orderBy.value === null || this.orderBy.value === undefined) {
      // Because of API fails when query param orderBy is null,
      // here is provided patching of default value
      this.dataFormGroup.get('orderBy')?.patchValue(OrderBy.relevance);
    }
    this.searchParams = this.dataFormGroup.value;
    if (this.searchParams) {
      this.loaderService.start();
      this.booksService.getBooksCollection(this.searchParams).subscribe({
        next: (response) => {
          this.volumesEmmiter.emit(response);
          this.loaderService.stop();
        },
        error: (err) => {
          this.notificationService.error(err);
          this.loaderService.stop();
        },
      });
    }
  }
}
