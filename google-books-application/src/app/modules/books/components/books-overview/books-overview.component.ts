import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { CollectionResultModel } from 'src/app/shared/models/collection-result.intereface';
import { VolumesSteps } from '../../enums/volumes-steps.enum';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { NotificationService } from '../../shared/services/error.service';
import { LoaderService } from '../../shared/services/loader.service';
import { BooksSearchComponent } from '../books-search/books-search.component';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent {
  @ViewChild(BooksSearchComponent)
  public booksSearchReference: BooksSearchComponent | null = null;

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  public volumesCount: number | null = null;
  public volumesCollection: Volume[] | undefined;
  public searchTerm = '';

  public getVolumes(data: CollectionResultModel<Volume[]>): void {
    this.volumesCollection = data.items;
    this.volumesCount = data.totalItems;
    this.searchTerm = this.booksSearchReference?.dataFormGroup.get('q')?.value;
  }

  public onResetResults(): void {
    this.volumesCollection?.splice(0, this.volumesCollection.length);
    if (this.booksSearchReference?.searchParams) {
      this.booksSearchReference.searchParams.startIndex = VolumesSteps.ZeroStep;
    }
  }

  public onMoreResults(): void {
    if (this.booksSearchReference?.searchParams) {
      this.booksSearchReference.searchParams.startIndex +=
        VolumesSteps.BaseStep;
      this.loaderService.start();
      this.booksService
        .getBooksCollection(this.booksSearchReference.searchParams)
        .subscribe({
          next: (response) => {
            if (response.items) {
              this.volumesCollection?.push(...response.items);
              this.loaderService.stop();
            }
          },
          error: (err) => {
            this.notificationService.error(err);
            this.loaderService.stop();
          },
        });
    }
  }
}
