import { Component } from '@angular/core';
import { VolumesSteps } from '../../enums/volumes-steps.enum';
import { SearchParams } from '../../models/search-params.interface';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { CollectionResultModel } from '../../../../shared/models/collection-result.interface';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent {
  public volumesCollection: CollectionResultModel<Volume[]> | null = null;
  public searchParams: SearchParams | null = null;
  public volumesSteps = VolumesSteps;

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  /* Important remark: Because of Google Books API return every time different totalItems
  (for unknown reason...), it is impossible to make pagination in "right" and "user-friendly" way
  (When user see total items count, when user see number of pages and can click through them and so on...).
  And that is reason, why I made pagination system in this way. Stack Over Flow discussion about this issue:
  https://stackoverflow.com/questions/7266838/google-books-api-returns-json-with-a-seemingly-wrong-totalitem-value */

  public getSearchParams(data: SearchParams): void {
    this.searchParams = data;
    if (this.searchParams) {
      this.getVolumesCollection(this.searchParams);
    }
  }

  public onPreviousResults(): void {
    if (this.searchParams) {
      if (this.searchParams.startIndex > VolumesSteps.Zero) {
        this.searchParams.startIndex -= VolumesSteps.BaseStep;
        this.getVolumesCollection(this.searchParams);
      }
    }
  }

  public onNextResults(): void {
    if (this.searchParams && this.volumesCollection?.totalItems) {
      if (
        this.searchParams.startIndex <
        this.volumesCollection.totalItems - VolumesSteps.BaseStep
      ) {
        this.searchParams.startIndex += VolumesSteps.BaseStep;
        this.getVolumesCollection(this.searchParams);
      }
    }
  }

  private getVolumesCollection(searchParams: SearchParams): void {
    this.loaderService.start();
    this.booksService.getBooksCollection(searchParams).subscribe({
      next: (response) => {
        if (response) {
          this.volumesCollection = response;
          window.scrollTo(0, 0);
        }
        this.loaderService.stop();
      },
      error: (err) => {
        this.errorService.error(err);
        this.loaderService.stop();
      },
    });
  }
}
