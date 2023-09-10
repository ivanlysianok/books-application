import { Component, DestroyRef, inject } from '@angular/core';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { BooksService } from '../../../../services/books.service';
import { SearchParams } from '../../../../models/search-params.interface';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PAGINATION_STEP } from '../../../../constants/pagination-step.const';
import { BookItem } from '../../../../models/book-item.interface';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { DEFAULT_MESSAGE } from '../../../../../../shared/constants/default-message.const';
import { ICON_DEFINITION } from '../../../../../../shared/constants/icon-definition.const';
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  protected books: BookItem[] | null = null;
  protected searchParams: SearchParams | null = null;
  protected readonly ICON_DEFINITION = ICON_DEFINITION;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  protected loadBooks(searchParams: SearchParams): void {
    this.searchParams = searchParams;
    this.fetchBooks();
  }

  private fetchBooks(isLoadOnInit = true): void {
    if (!this.searchParams) {
      return;
    }
    this.loaderService.start();
    this.booksService
      .getBookItems(this.searchParams)
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
          this.getBooksItems(isLoadOnInit, response);
        },
        error: () => {
          this.notificationService.showSnackbar(DEFAULT_MESSAGE.ERROR);
        },
      });
  }

  private getBooksItems(isLoadOnInit: boolean, bookItems: BookItem[]): void {
    if (isLoadOnInit) {
      this.books = bookItems;
    } else {
      this.books?.push(...bookItems);
    }
  }

  protected onUpdateFavoriteBook(id: string): void {
    if (!this.books) {
      return;
    }
    this.books = this.books.map((book) => {
      if (book.id === id) {
        book.isFavorite = !book.isFavorite;
      }
      return book;
    });
  }

  protected onNextResults(): void {
    if (!this.searchParams || !this.books?.length) {
      return;
    }
    this.searchParams.startIndex += PAGINATION_STEP;
    this.fetchBooks(false);
  }
}
