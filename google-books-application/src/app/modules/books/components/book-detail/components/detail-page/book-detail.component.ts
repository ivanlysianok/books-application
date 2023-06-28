import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookItem } from '../../../../models/book-item.interface';
import { BooksService } from '../../../../services/books.service';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  /**
   * Book item that user get by book ID
   */
  protected bookItem: BookItem | null = null;
  /**
   * Destroy ref to unsubscribing from observables
   */
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getBookById(this.route.snapshot.paramMap.get('id'));
  }

  /**
   * Get book data from server by book ID
   */
  private getBookById(id: string | null): void {
    if (!id) {
      return;
    }
    this.loaderService.start();
    this.booksService
      .getBookById(id)
      .pipe(
        finalize(() => {
          this.loaderService.stop();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          this.bookItem = response;
        },
        error: (err) => {
          this.errorService.error(err);
        },
      });
  }
}
