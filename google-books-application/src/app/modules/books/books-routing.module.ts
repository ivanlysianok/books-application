import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../shared/components/page-not-found/page-not-found.component';
import { BookDetailComponent } from './components/book-detail/components/detail-page/book-detail.component';
import { BooksOverviewComponent } from './components/books-overview/components/overview-page/books-overview.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
