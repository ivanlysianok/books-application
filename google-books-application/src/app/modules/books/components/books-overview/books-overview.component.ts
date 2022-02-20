import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorHeader } from '../../constants/error-headers.constant';
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
  public booksSearchReference: BooksSearchComponent | null = null;

  constructor(private booksService: BooksService, private toastrService: ToastrService) {}

  public volumesPagination = VolumesPagination;
  public startIndex = 0;
  public volumesCount = 0;
  public searchTerm: string = '';
  public volumesCollection: Volume[] = [];
  public showVolumes = false;
  public isLoading = false;

  public getVolumes(data: Volume[]): void {
    this.volumesCollection = data;
    this.showVolumes = true;
  }

  public getVolumesCount(data: number): void {
    this.volumesCount = data;
  }

  public getSearchTerm(data: string): void {
    this.searchTerm = data;
  }

  public onResetResults(): void {
    this.volumesCollection.splice(0, this.volumesCollection.length);
    this.volumesCount = 0;
    this.showVolumes = false;
  }

  public onMoreResults(): void {
    if (this.booksSearchReference) {
      this.startIndex = this.startIndex + this.volumesPagination.basicStep;
      this.booksSearchReference.dataFormGroup.controls['startIndex'].patchValue(
        this.startIndex
      );
      this.isLoading = true;
      this.booksService
        .getBooksCollection(this.booksSearchReference.dataFormGroup.value)
        .subscribe({
          next: (response) => {
            if (response.items) {
              this.volumesCollection.push(...response.items);
              this.volumesCount = response.totalItems;
            }
            this.isLoading = false;
          },
          error: (err) => {
            this.toastrService.error(err.error.error.message, ErrorHeader);
            this.isLoading = false;
          }
        });
    }
  }
}
