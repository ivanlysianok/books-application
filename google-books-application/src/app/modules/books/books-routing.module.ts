import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksOverviewComponent } from './components/books-overview/components/overview-page/books-overview.component';
import { BookDetailComponent } from './components/book-detail/components/detail-page/book-detail.component';
import { PageNotFoundComponent } from '../../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'books-overview',
    component: BooksOverviewComponent,
  },
  {
    path: 'book-detail/:id',
    component: BookDetailComponent,
  },
  {
    path: '',
    redirectTo: 'books-overview',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
