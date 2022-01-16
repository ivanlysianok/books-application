import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksOverviewComponent } from './components/books-overview/books-overview.component';

const routes: Routes = [
  {
    path: '',
    component: BooksOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class BooksOverviewRoutingModule {}
