import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksOverviewRoutingModule } from './books-overview-routing.module';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';
import { BooksService } from './services/books.service';

@NgModule({
  declarations: [BooksOverviewComponent],
  imports: [BooksOverviewRoutingModule, ReactiveFormsModule],
  providers: [BooksService]
})
export class BooksOverviewModule {}
