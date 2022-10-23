import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookCardModule } from '../book-card/book-card.module';
import { BooksSearchModule } from '../books-search/books-search.module';
import { BooksOverviewComponent } from './components/overview-page/books-overview.component';
import { PaginationButtonComponent } from './components/pagination-button/pagination-button.component';

@NgModule({
  declarations: [BooksOverviewComponent, PaginationButtonComponent],
  imports: [SharedModule, BookCardModule, BooksSearchModule],
  exports: [BooksOverviewComponent, PaginationButtonComponent],
})
export class BooksOverviewModule {}
