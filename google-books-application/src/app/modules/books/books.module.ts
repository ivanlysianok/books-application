import { NgModule } from '@angular/core';
import { BooksService } from './services/books.service';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BooksFavoriteComponent } from './components/books-favorite/books-favorite.component';
import { BooksSearchComponent } from './components/books-search/components/overview-page/books-search.component';
import { BooksSearchFormComponent } from './components/books-search-form/components/books-search-form.component';
import { BookCardListComponent } from './components/book-card-list/components/card/book-card-list.component';

@NgModule({
  declarations: [
    BooksSearchFormComponent,
    BooksSearchComponent,
    BooksFavoriteComponent,
    BookCardListComponent,
  ],
  imports: [BooksRoutingModule, SharedModule],
  providers: [BooksService],
})
export class BooksModule {}
