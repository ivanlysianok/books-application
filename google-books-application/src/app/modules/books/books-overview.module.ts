import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksOverviewRoutingModule } from './books-overview-routing.module';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';
import { BooksService } from './services/books.service';
import { BooksSearchComponent } from './components/books-search/books-search.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BooksOverviewComponent,
    BooksSearchComponent,
    BookCardComponent,
    BookDetailComponent,
  ],
  imports: [
    BooksOverviewRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ],
  providers: [BooksService],
})
export class BooksOverviewModule {}
