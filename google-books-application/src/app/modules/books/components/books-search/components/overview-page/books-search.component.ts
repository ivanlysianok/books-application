import { Component, DestroyRef, inject } from '@angular/core';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { BooksService } from '../../../../services/books.service';
import { CollectionResultModel } from '../../../../../../shared/models/collection-result.interface';
import { BookItem } from '../../../../models/book-item.interface';
import { SearchParams } from 'src/app/modules/books/models/search-params.interface';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  protected booksCollection: CollectionResultModel<BookItem[]> | null = null;
  protected searchParams: SearchParams | null = null;
  protected paginationStep = 30;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService
  ) {}

  protected loadBooks(searchParams: SearchParams): void {
    this.searchParams = searchParams;
    this.fetchBooksFromServer();
  }

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
        takeUntilDestroyed(this.destroyRef)
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

  protected getPreviousResults(): void {
    if (!this.searchParams || this.searchParams.startIndex < 0) {
      return;
    }
    this.searchParams.startIndex -= this.paginationStep;
    this.fetchBooksFromServer();
  }

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
}
