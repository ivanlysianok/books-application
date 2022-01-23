import { Component, ViewChild } from '@angular/core';
import { CollectionResultModel } from 'src/app/shared/models/collection-result.intereface';
import { VolumesPagination } from '../../constants/volumes-pagination.constant';
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
  public volumesPagination = VolumesPagination;
  public volumesCollection: Volume[] = [];
  public volumesTotalCount = 0;
  public maxResults = VolumesPagination.startStep;
  public showVolumes = false;
  constructor(private booksService: BooksService) {}

  getSearchData(data: CollectionResultModel<Volume[]>): void {
    this.volumesCollection = data.items;
    this.volumesTotalCount = data.totalItems;
    this.showVolumes = true;
  }

  onLessResults(): void {
    console.log(this.volumesCollection);
    if (this.maxResults > 3) {
      this.maxResults = this.maxResults - VolumesPagination.basicStep;
      this.volumesCollection.splice(
        this.maxResults,
        VolumesPagination.basicStep
      );
    }
  }

  onMoreResults(): void {
    if (this.booksSearchReference) {
      this.maxResults = this.maxResults + VolumesPagination.basicStep;
      this.booksSearchReference.dataFormGroup.controls['maxResults'].patchValue(
        this.maxResults
      );
      this.booksService
        .getBooksCollection(this.booksSearchReference.dataFormGroup.value)
        .subscribe((response) => {
          if (response) {
            this.volumesCollection = response.items;
          }
        });
    }
  }
}
