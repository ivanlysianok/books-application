import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';

const routes: Routes = [
  {
    path: '',
    component: BooksOverviewComponent,
  },
  {
    path: 'book-detail/:id',
    component: BookDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksOverviewRoutingModule {}
