import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss']
})

export class BooksOverviewComponent {
  public dataFormGroup: FormGroup;
  public booksCollection: Volume[] = [];
  constructor(private booksService: BooksService, private formBuilder: FormBuilder) {
    this.dataFormGroup = this.formBuilder.group({
      q: ['', Validators.required],
      orderBy: [null, Validators.required],
    })
  }

  onSearch(): void {
    this.booksService.getBooksCollection(this.dataFormGroup.value).subscribe((response) => {
      this.booksCollection = response.items;
    })
  }

}
