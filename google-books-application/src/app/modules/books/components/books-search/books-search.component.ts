import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit, OnChanges {
  @Output() dataEmitter = new EventEmitter<Volume[]>();
  @Input() maxResults: number | null = null;
  public dataFormGroup: FormGroup;
  public categories: string[] = [];
  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder
  ) {
    this.dataFormGroup = this.formBuilder.group({
      q: [''],
      subject: [''],
      orderBy: [''],
      startIndex: ['0'],
      maxResults: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.updateMaxResultsProp();
    }
  }

  ngOnInit(): void {
    this.booksService.getCategories().subscribe((response) => {
      if (response) {
        this.categories = response;
      }
    });
  }

  onSearch(): void {
    this.booksService
      .getBooksCollection(this.dataFormGroup.value)
      .subscribe((response) => {
        if (response.items) {
          this.dataEmitter.emit(response.items);
        }
      });
  }

  updateMaxResultsProp(): void {
    if (this.maxResults) {
      this.dataFormGroup.controls['maxResults'].patchValue(this.maxResults.toString())
    }
  }
}
