import { Component, ViewChild } from '@angular/core';
import { VolumesPagination } from '../../constants/pagination.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { BooksSearchComponent } from '../books-search/books-search.component';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent {
  @ViewChild(BooksSearchComponent)
  booksSearchReference: BooksSearchComponent | null = null;
  public volumesCollection: Volume[] = [];
  public maxResults = VolumesPagination.basicStep
  public showVolumes = false;

  constructor(private booksService: BooksService) {}

  getSearchData(data: Volume[]): void {
    this.volumesCollection = data;
    if (this.volumesCollection.length > 0) {
      this.showVolumes = true;
    }
  }

  lessResults(): void {
    if (this.maxResults > 3) {
      this.maxResults = this.maxResults - VolumesPagination.basicStep;
      console.log(this.maxResults)
      this.volumesCollection.splice(this.maxResults, VolumesPagination.basicStep)
    }
  }

  moreResults(): void {
    if (this.booksSearchReference) {
      this.maxResults = this.maxResults + VolumesPagination.basicStep;
      const formGroup = this.booksSearchReference.dataFormGroup;
      formGroup.controls['maxResults'].patchValue(this.maxResults.toString())
      this.booksService.getBooksCollection(formGroup.value).subscribe((response) => {
        if (response) {
          this.volumesCollection = response.items;
        }
      })
    }
  }
}
