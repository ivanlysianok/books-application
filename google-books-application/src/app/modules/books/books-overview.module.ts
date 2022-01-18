import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksOverviewRoutingModule } from './books-overview-routing.module';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';
import { BooksService } from './services/books.service';
import { BooksSearchComponent } from './components/books-search/books-search.component';

@NgModule({
  declarations: [BooksOverviewComponent, BooksSearchComponent],
  imports: [BooksOverviewRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [BooksService],
})
export class BooksOverviewModule {}