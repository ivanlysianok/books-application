import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksOverviewComponent } from './components/books-overview/components/overview-page/books-overview.component';
import { BookDetailComponent } from './components/book-detail/components/detail-page/book-detail.component';
import { AuthGuard } from '../../core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'books-overview',
    component: BooksOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book-detail/:id',
    component: BookDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
