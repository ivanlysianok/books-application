import { NgModule } from '@angular/core';
import { BooksService } from './services/books.service';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BookDetailComponent } from './components/book-detail/components/detail-page/book-detail.component';
import { BookDetailContentComponent } from './components/book-detail/components/detail-content/book-detail-content.component';
import { BookCardComponent } from './components/book-card/components/card/book-card.component';
import { BooksFavoriteComponent } from './components/books-favorite/books-favorite.component';
import { BooksSearchComponent } from './components/books-search/components/overview-page/books-search.component';
import { BooksSearchFormComponent } from './components/books-search-form/components/books-search-form.component';
import { BookDetailDialogComponent } from './components/book-detail-dialog/book-detail-dialog.component';

@NgModule({
  declarations: [
    BooksSearchFormComponent,
    BooksSearchComponent,
    BookDetailComponent,
    BookDetailContentComponent,
    BookCardComponent,
    BooksFavoriteComponent,
    BookDetailDialogComponent,
  ],
  imports: [BooksRoutingModule, SharedModule],
  providers: [BooksService],
})
export class BooksModule {}
