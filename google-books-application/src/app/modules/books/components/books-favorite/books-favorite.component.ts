import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { BookCollection } from '../../models/book-collection.interface';
import { BooksService } from '../../services/books.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-books-favorite',
  templateUrl: './books-favorite.component.html',
  styleUrls: ['./books-favorite.component.scss'],
})
export class BooksFavoriteComponent implements OnInit {
  protected booksCollection: BookCollection | null = null;
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
          this.booksCollection = response;
        },
      });
  }

  protected onRemoveFromFavoriteById(id: string): void {
    if (!this.booksCollection?.items) {
      return;
    }
    const bookIndex = this.booksCollection.items.findIndex(
      (book) => book.id === id
    );
    this.booksCollection.items.splice(bookIndex, 1);
  }
}
