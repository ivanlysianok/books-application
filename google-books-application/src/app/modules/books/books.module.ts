import { NgModule } from '@angular/core';
import { BooksService } from './services/books.service';
import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BooksSearchComponent } from './components/books-search/components/books-search.component';
import { BooksOverviewComponent } from './components/books-overview/components/overview-page/books-overview.component';
import { BookDetailComponent } from './components/book-detail/components/detail-page/book-detail.component';
import { BookDetailContentComponent } from './components/book-detail/components/detail-content/book-detail-content.component';
import { BookCardContentComponent } from './components/book-card/components/card-content/book-card-content.component';
import { BookCardComponent } from './components/book-card/components/card/book-card.component';

@NgModule({
  declarations: [
    BooksSearchComponent,
    BooksOverviewComponent,
    BookDetailComponent,
    BookDetailContentComponent,
    BookCardContentComponent,
    BookCardComponent,
  ],
  imports: [BooksRoutingModule, SharedModule],
  providers: [BooksService],
})
export class BooksModule {}
