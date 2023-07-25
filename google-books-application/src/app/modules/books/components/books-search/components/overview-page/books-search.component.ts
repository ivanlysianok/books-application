import { Component, DestroyRef, inject } from '@angular/core';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { BooksService } from '../../../../services/books.service';
import { SearchParams } from 'src/app/modules/books/models/search-params.interface';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookCollection } from '../../../../models/book-collection.interface';
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  protected bookCollection: BookCollection | null = null;
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
          this.bookCollection = response;
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
    if (!this.searchParams || !this.bookCollection?.totalItems) {
      return;
    }
    if (
      this.searchParams.startIndex <
      this.bookCollection.totalItems - this.paginationStep
    ) {
      this.searchParams.startIndex += this.paginationStep;
      this.fetchBooksFromServer();
    }
  }
}
