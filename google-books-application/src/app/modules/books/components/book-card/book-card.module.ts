import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookCardContentComponent } from './components/card-content/book-card-content.component';
import { BookCardComponent } from './components/card/book-card.component';

@NgModule({
  declarations: [BookCardContentComponent, BookCardComponent],
  imports: [SharedModule],
  exports: [BookCardContentComponent, BookCardComponent],
})
export class BookCardModule {}
