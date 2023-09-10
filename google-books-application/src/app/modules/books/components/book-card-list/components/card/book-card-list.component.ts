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
import { LoaderService } from '../../../../../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FAVORITE_OPERATION_MESSAGE } from '../../../../constants/favorite-operation-message.const';
import { NotificationService } from '../../../../../../shared/services/notification.service';
import { DEFAULT_MESSAGE } from '../../../../../../shared/constants/default-message.const';
import { ICON_DEFINITION } from '../../../../../../shared/constants/icon-definition.const';

@Component({
  selector: 'app-book-card-list',
  templateUrl: './book-card-list.component.html',
  styleUrls: ['./book-card-list.component.scss'],
})
export class BookCardListComponent {
  @Input({ required: true }) bookItems: BookItem[] = [];
  @Output() updateFavoriteShelf: EventEmitter<string> =
    new EventEmitter<string>();

  protected readonly CARD_IMAGE_PLACEHOLDER = CARD_IMAGE_PLACEHOLDER;
  protected readonly ICON_DEFINITION = ICON_DEFINITION;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private bookService: BooksService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  protected onFavoriteIconClick(book: BookItem): void {
    book.isFavorite
      ? this.deleteBookFromFavoriteShelft(book.id)
      : this.addBookToFavoriteShelf(book.id);
  }

  private addBookToFavoriteShelf(id: string): void {
    this.loaderService.start();
    this.bookService
      .addBookToFavoriteById(id)
      .pipe(
        finalize(() => {
          this.loaderService.stop();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.notificationService.showSnackbar(
            FAVORITE_OPERATION_MESSAGE.ADDED
          );
          this.updateFavoriteShelf.emit(id);
        },
      });
  }

  private deleteBookFromFavoriteShelft(id: string): void {
    this.loaderService.start();
    this.bookService
      .deleteBookFromFavoriteById(id)
      .pipe(
        finalize(() => {
          this.loaderService.stop();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.notificationService.showSnackbar(
            FAVORITE_OPERATION_MESSAGE.REMOVED
          );
          this.updateFavoriteShelf.emit(id);
        },
        error: () => {
          this.notificationService.showSnackbar(DEFAULT_MESSAGE.ERROR);
        },
      });
  }

  protected onOpenDetailDialog(): void {
    //
  }
}
