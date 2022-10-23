import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookCoverComponent } from './components/book-cover/book-cover.component';
import { BookListItemsComponent } from './components/book-list-items/book-list-items.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TruncatePipe } from './pipes/truncate-text.pipe';
import { ErrorService } from './services/error.service';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    LoaderComponent,
    PageNotFoundComponent,
    BookListItemsComponent,
    TruncatePipe,
    BookCoverComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    LoaderComponent,
    BookListItemsComponent,
    PageNotFoundComponent,
    TruncatePipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BookCoverComponent,
  ],
  providers: [LoaderService, ErrorService],
})
export class SharedModule {}
