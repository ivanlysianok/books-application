import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent {
  @Output() dataEmitter = new EventEmitter<Volume[]>();

  public dataFormGroup: FormGroup;
  public categories: string[] = [];
  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder
  ) {
    // TODO - Implement pagination here with maxResults and startIndex properties //
    this.dataFormGroup = this.formBuilder.group({
      q: [''],
      subject: [''],
      orderBy: [null],
      maxResults: []
    });
  }

  ngOnInit(): void {
    this.booksService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onSearch(): void {
    this.booksService
      .getBooksCollection(this.dataFormGroup.value)
      .subscribe((response) => {
        console.log(response.items)
        this.dataEmitter.emit(response.items)
      });
  }
}
