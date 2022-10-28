import { Component } from '@angular/core';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { BooksService } from '../../../../services/books.service';
import { CollectionResultModel } from '../../../../../../shared/models/collection-result.interface';
import { Volume } from '../../../../models/volume.interface';
import { SearchParams } from 'src/app/modules/books/models/search-params.interface';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent {
  protected booksCollection: CollectionResultModel<Volume[]> | null = null;
  protected searchParams: SearchParams | null = null;
  protected paginationStep = 30;

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  /* Important remark: Because of Google Books API return every time different totalItems
  (for unknown reason...), it is impossible to make pagination in more "user-friendly" way
  (When user see total items count, when user see number of pages and can click through them and so on...).
  And that is reason, why I made pagination system in this way. Stack Over Flow discussion about this issue:
  https://stackoverflow.com/questions/7266838/google-books-api-returns-json-with-a-seemingly-wrong-totalitem-value */

  protected getSearchParams(data: SearchParams | null): void {
    if (!data) {
      return;
    }
    this.searchParams = data;
    this.searchParams.startIndex = 0;
    this.loadBooksCollection();
  }

  protected onPreviousPageClick(): void {
    if (!this.searchParams) {
      return;
    }

    if (this.searchParams.startIndex > 0) {
      this.searchParams.startIndex -= this.paginationStep;
      this.loadBooksCollection();
    }
  }

  protected onNextPageClick(): void {
    if (!this.searchParams || !this.booksCollection?.totalItems) {
      return;
    }

    if (
      this.searchParams.startIndex <
      this.booksCollection.totalItems - this.paginationStep
    ) {
      this.searchParams.startIndex += this.paginationStep;
      this.loadBooksCollection();
    }
  }

  private loadBooksCollection(): void {
    if (!this.searchParams) {
      return;
    }
    this.loaderService.start();
    this.booksService.getBooks(this.searchParams).subscribe({
      next: (response) => {
        if (response) {
          this.booksCollection = response;
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
