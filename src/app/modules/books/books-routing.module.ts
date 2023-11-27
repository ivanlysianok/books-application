import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { BooksFavoriteComponent } from './components/books-favorite/books-favorite.component';
import { BooksSearchComponent } from './components/books-search/components/overview-page/books-search.component';

const routes: Routes = [
  {
    path: 'search',
    component: BooksSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favorite',
    component: BooksFavoriteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
