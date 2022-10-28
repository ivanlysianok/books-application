import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookDetailContentComponent } from './components/detail-content/book-detail-content.component';
import { BookDetailComponent } from './components/detail-page/book-detail.component';

@NgModule({
  declarations: [BookDetailComponent, BookDetailContentComponent],
  imports: [SharedModule],
  exports: [BookDetailComponent, BookDetailContentComponent],
})
export class BookDetailModule {}
