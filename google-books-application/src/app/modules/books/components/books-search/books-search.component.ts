import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHeader } from '../../constants/error-headers.constant';
import { OrderBy } from '../../constants/order-by.constant';
import { VolumesPagination } from '../../constants/volumes-pagination.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit {
  @Output() volumesEmmiter = new EventEmitter<Volume[]>();
  @Output() volumesCount = new EventEmitter<number>();
  @Output() searchTerm = new EventEmitter<string>();
  @Input() maxResults: number | null = null;

  public dataFormGroup: FormGroup;
  public categories: string[] = [];
  public isLoading = false;
  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.dataFormGroup = this.formBuilder.group({
      q: ['', Validators.required],
      subject: [''],
      orderBy: [''],
      startIndex: [VolumesPagination.startIndex],
      maxResults: [VolumesPagination.basicStep],
    });
  }

  public ngOnInit(): void {
    this.booksService.getCategories().subscribe((response) => {
      if (response) {
        this.categories = response;
        this.orderByPatchDefaultValue();
      }
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
      this.orderByPatchDefaultValue();
    }
    this.isLoading = true;
    this.searchTerm.emit(this.dataFormGroup.controls['q'].value);
    this.booksService.getBooksCollection(this.dataFormGroup.value).subscribe({
      next: (response) => {
        this.volumesEmmiter.emit(response.items);
        this.volumesCount.emit(response.totalItems);
        this.isLoading = false;
      },
      error: (err) => {
        this.toastrService.error(err.error.error.message, ErrorHeader);
        this.isLoading = false;
      },
    });
  }

  // Because of API fails when query param orderBy is null,
  // here is provided patching of default value
  public orderByPatchDefaultValue(): void {
    this.dataFormGroup.patchValue({
      orderBy: OrderBy.relevance,
    });
  }
}
