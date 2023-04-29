import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookItem } from '../../../../models/book-item.interface';
import { BooksService } from '../../../../services/books.service';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  /**
   * Book item that user get by book ID
   */
  protected bookItem: BookItem | null = null;
  /**
   * Subject for unsubscribe from data streams
   */
  private destroySub$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getBookById(this.route.snapshot.paramMap.get('id'));
  }

  ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.unsubscribe();
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
        takeUntil(this.destroySub$)
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
