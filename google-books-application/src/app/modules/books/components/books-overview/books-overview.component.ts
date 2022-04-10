import { Component } from '@angular/core';
import { CollectionResultModel } from 'src/app/shared/models/collection-result.intereface';
import { VolumesSteps } from '../../enums/volumes-steps.enum';
import { SearchParams } from '../../models/search-params.interface';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { NotificationService } from '../../shared/services/error.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent {
  public volumesCollection: CollectionResultModel<Volume[]> | null = null;
  public searchParams: SearchParams | null = null;
  public volumesCountStep = VolumesSteps.BaseStep;
  public volumesSteps = VolumesSteps;

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  public getSearchParams(data: SearchParams): void {
    this.searchParams = data;
    if (this.searchParams) {
      this.getVolumesCollection(this.searchParams, true);
    }
  }

  public onPreviousResults(): void {
    if (this.searchParams) {
      if (this.searchParams.startIndex > VolumesSteps.ZeroStep) {
        this.searchParams.startIndex -= VolumesSteps.BaseStep;
        this.volumesCountStep -= VolumesSteps.BaseStep;
        this.getVolumesCollection(this.searchParams);
      }
    }
  }

  public onNextResults(): void {
    if (this.searchParams) {
      this.searchParams.startIndex += VolumesSteps.BaseStep;
      this.volumesCountStep += VolumesSteps.BaseStep;
      this.getVolumesCollection(this.searchParams);
    }
  }

  private getVolumesCollection(
    searchParams: SearchParams,
    onSearchLoading?: boolean
  ): void {
    this.loaderService.start();
    this.booksService.getBooksCollection(searchParams).subscribe({
      next: (response) => {
        /* onSearchLoading flag is used here because collection
        totalCount is dynamically changes every time api is called,
        so for UX reasons totalCount value is need it to get only
        when "search" button is hitted */
        if (onSearchLoading) {
          this.volumesCollection = response;
        }
        if (this.volumesCollection?.items) {
          this.volumesCollection.items = response.items;
        }
        this.loaderService.stop();
      },
      error: (err) => {
        this.notificationService.error(err);
        this.loaderService.stop();
      },
    });
  }
}
