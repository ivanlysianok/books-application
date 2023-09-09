import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookItem } from '../../models/book-item.interface';
@Component({
  selector: 'app-books-favorite',
  templateUrl: './books-favorite.component.html',
  styleUrls: ['./books-favorite.component.scss'],
})
export class BooksFavoriteComponent implements OnInit {
  protected books: BookItem[] | null = null;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private booksService: BooksService,
    private loaderService: LoaderService
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
          console.log(this.books, 'books');
        },
      });
  }

  protected onRemoveFromFavoriteById(id: string): void {
    if (!this.books) {
      return;
    }
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books.splice(bookIndex, 1);
  }
}
