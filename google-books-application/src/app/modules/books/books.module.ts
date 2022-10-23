import { NgModule } from '@angular/core';
import { BooksService } from './services/books.service';
import { BooksRoutingModule } from './books-routing.module';
import { BooksSearchModule } from './components/books-search/books-search.module';
import { BooksOverviewModule } from './components/books-overview/books-overview.module';
import { BookDetailModule } from './components/book-detail/book-detail.module';
import { BookCardModule } from './components/book-card/book-card.module';

@NgModule({
  imports: [
    BooksRoutingModule,
    BooksSearchModule,
    BooksOverviewModule,
    BookDetailModule,
    BookCardModule,
  ],
  providers: [BooksService],
})
export class BooksModule {}
