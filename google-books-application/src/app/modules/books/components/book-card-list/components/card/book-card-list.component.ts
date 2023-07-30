import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { BookItem } from '../../../../models/book-item.interface';
import { CARD_IMAGE_PLACEHOLDER } from '../../../../constants/card-image-placeholder.const';
import { BooksService } from '../../../../services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FAVORITE_OPERATION_MESSAGE } from '../../../../constants/favorite-operation-message.const';

@Component({
  selector: 'app-book-card-list',
  templateUrl: './book-card-list.component.html',
  styleUrls: ['./book-card-list.component.scss'],
})
export class BookCardListComponent {
  @Input({ required: true }) bookItems: BookItem[] = [];
  @Output() favoriteStateChange: EventEmitter<void> = new EventEmitter<void>();

  protected CARD_IMAGE_PLACEHOLDER = CARD_IMAGE_PLACEHOLDER;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private bookService: BooksService,
    private loaderService: LoaderService,
    private matSnackbar: MatSnackBar
  ) {}

  // TODO: Instead of dialog, open this book in official Google books page.
  protected onOpenDetailDialog(): void {}

  private openSnackbarWithMessage(message: string): void {
    this.matSnackbar.open(message, undefined, {
      duration: 3000,
    });
  }

  protected onChangeFavoriteState(book: BookItem): void {
    this.loaderService.start();
    this.bookService
      .changeFavoriteStateById(!book.isFavorite, book.id)
      .pipe(
        finalize(() => {
          this.loaderService.stop();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          book.isFavorite = !book.isFavorite;
          this.openSnackbarWithMessage(
            book.isFavorite
              ? FAVORITE_OPERATION_MESSAGE.ADDED
              : FAVORITE_OPERATION_MESSAGE.REMOVED
          );
          this.favoriteStateChange.emit();
        },
      });
  }
}
