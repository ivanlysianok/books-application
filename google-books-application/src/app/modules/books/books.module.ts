import { NgModule } from '@angular/core';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';
import { BooksService } from './services/books.service';
import { BooksSearchComponent } from './components/books-search/books-search.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { PaginationButtonComponent } from './components/books-overview/pagination-button/pagination-button.component';

@NgModule({
  declarations: [
    BooksOverviewComponent,
    BooksSearchComponent,
    BookCardComponent,
    BookDetailComponent,
    PaginationButtonComponent,
  ],
  imports: [BooksRoutingModule, SharedModule],
  providers: [BooksService],
})
export class BooksModule {}
