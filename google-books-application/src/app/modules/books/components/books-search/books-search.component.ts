import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionResultModel } from 'src/app/shared/models/collection-result.intereface';
import { OrderBy } from '../../constants/order-by.constant';
import { VolumesPagination } from '../../constants/volumes-pagination.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit, OnChanges {
  @Output() dataEmitter = new EventEmitter<CollectionResultModel<Volume[]>>();
  @Input() maxResults: number | null = null;
  public dataFormGroup: FormGroup;
  public categories: string[] = [];
  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder
  ) {
    this.dataFormGroup = this.formBuilder.group({
      q: ['', Validators.required],
      subject: [''],
      orderBy: [''],
      startIndex: [VolumesPagination.startIndex],
      maxResults: [null],
    });
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.updateMaxResults();
    }
  }

  public ngOnInit(): void {
    this.booksService.getCategories().subscribe((response) => {
      if (response) {
        this.categories = response;
        // Because of API fails when query param orderBy is null,
        // here is provided patching of default value
        this.dataFormGroup.patchValue({
          orderBy: OrderBy.relevance,
        });
      }
    });
  }

  public onSearch(): void {
    if (this.dataFormGroup.invalid) {
      this.q?.markAsTouched();
      return;
    }
    this.booksService
      .getBooksCollection(this.dataFormGroup.value)
      .subscribe((response) => {
        this.dataEmitter.emit(response);
      });
  }

  private updateMaxResults(): void {
    if (this.maxResults) {
      this.dataFormGroup.controls['maxResults'].patchValue(this.maxResults);
    }
  }

  public get q() {
    return this.dataFormGroup.get('q');
  }
}
