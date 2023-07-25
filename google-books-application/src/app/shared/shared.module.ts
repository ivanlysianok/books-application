import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookCoverComponent } from './components/book-cover/book-cover.component';
import { BookListItemsComponent } from './components/book-list-items/book-list-items.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { ErrorService } from './services/error.service';
import { LoaderService } from './services/loader.service';
import { MaterialModule } from '../modules/material/material.module';

@NgModule({
  declarations: [
    LoaderComponent,
    PageNotFoundComponent,
    BookListItemsComponent,
    TruncateTextPipe,
    BookCoverComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    NgOptimizedImage,
  ],
  exports: [
    LoaderComponent,
    BookListItemsComponent,
    PageNotFoundComponent,
    TruncateTextPipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BookCoverComponent,
    MaterialModule,
    NgOptimizedImage,
  ],
  providers: [LoaderService, ErrorService],
})
export class SharedModule {}
