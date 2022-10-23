import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksSearchComponent } from './components/books-search.component';

@NgModule({
  declarations: [BooksSearchComponent],
  imports: [SharedModule],
  exports: [BooksSearchComponent],
})
export class BooksSearchModule {}
