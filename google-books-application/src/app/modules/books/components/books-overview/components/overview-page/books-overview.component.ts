import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { BooksService } from '../../../../services/books.service';
import { CollectionResultModel } from '../../../../../../shared/models/collection-result.interface';
import { BookItem } from '../../../../models/book-item.interface';
import { SearchParams } from 'src/app/modules/books/models/search-params.interface';
import { Subject, finalize, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth/services/auth.service';

/**
 * Google auth variable
 */
declare const google: any;

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent implements OnDestroy {
  /**
   * Collection of books that will displayed in grid
   */
  protected booksCollection: CollectionResultModel<BookItem[]> | null = null;
  /**
   * Search parametrs data that user fill in search form
   */
  protected searchParams: SearchParams | null = null;
  /**
   * Base pagination step
   */
  protected paginationStep = 30;
  /**
   * Subject for unsubscribe from data streams
   */
  private destroySub$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService
  ) {}

  public ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.unsubscribe();
  }

  /**
   * Assign values to searchParams and load books from server
   * @param searchParams Search params type of SearchParams
   */
  protected loadBooks(searchParams: SearchParams): void {
    this.searchParams = searchParams;
    this.fetchBooksFromServer();
  }

  /**
   * Fetch books from API
   */
  private fetchBooksFromServer(): void {
    if (!this.searchParams) {
      return;
    }
    this.loaderService.start();
    this.booksService
      .getBooksCollection(this.searchParams)
      .pipe(
        finalize(() => {
          this.loaderService.stop();
        }),
        takeUntil(this.destroySub$)
      )
      .subscribe({
        next: (response) => {
          if (!response) {
            return;
          }
          this.booksCollection = response;
          window.scrollTo(0, 0);
        },
      });
  }

  /**
   * Fired when user clicked on previous page and load related data
   * from server
   */
  protected getPreviousResults(): void {
    if (!this.searchParams || this.searchParams.startIndex < 0) {
      return;
    }
    this.searchParams.startIndex -= this.paginationStep;
    this.fetchBooksFromServer();
  }

  /**
   * Fired when user clicked on next page and load related data
   * from server
   */
  protected getNextResults(): void {
    if (!this.searchParams || !this.booksCollection?.totalItems) {
      return;
    }
    if (
      this.searchParams.startIndex <
      this.booksCollection.totalItems - this.paginationStep
    ) {
      this.searchParams.startIndex += this.paginationStep;
      this.fetchBooksFromServer();
    }
  }

  bookListTrackBy(index: number, item: BookItem): string {
    return item.id;
  }
}
