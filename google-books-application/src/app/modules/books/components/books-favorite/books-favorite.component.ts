import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookItem } from '../../models/book-item.interface';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FAVORITE_OPERATION_MESSAGE } from '../../constants/favorite-operation-message.const';
import { DEFAULT_MESSAGE } from '../../../../shared/constants/default-message.const';
import { ICON_DEFINITION } from '../../../../shared/constants/icon-definition.const';
@Component({
  selector: 'app-books-favorite',
  templateUrl: './books-favorite.component.html',
  styleUrls: ['./books-favorite.component.scss'],
})
export class BooksFavoriteComponent implements OnInit {
  protected books: BookItem[] | null = null;
  protected readonly ICON_DEFINITION = ICON_DEFINITION;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchFavoriteBooks();
  }

  protected fetchFavoriteBooks(): void {
    this.loaderService.start();
    this.booksService
      .getFavoriteBooks()
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
          this.books = response;
        },
        error: () => {
          this.notificationService.showSnackbar(DEFAULT_MESSAGE.ERROR);
        },
      });
  }

  protected onClearBookById(id: string): void {
    if (!this.books) {
      return;
    }
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books.splice(bookIndex, 1);
  }

  protected onClearAllBooks(): void {
    if (!this.books?.length) {
      return;
    }
    this.loaderService.start();
    this.booksService
      .clearAllBooksFromFavoriteShelf()
      .pipe(
        finalize(() => this.loaderService.stop()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.notificationService.showSnackbar(
            FAVORITE_OPERATION_MESSAGE.REMOVED_ALL
          );
          this.fetchFavoriteBooks();
        },
        error: () => {
          this.notificationService.showSnackbar(DEFAULT_MESSAGE.ERROR);
        },
      });
  }
}
