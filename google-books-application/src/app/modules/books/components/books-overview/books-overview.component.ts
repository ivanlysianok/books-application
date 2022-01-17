import { Component } from '@angular/core';
import { Volume } from '../../models/volumes.interface';


@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
})
export class BooksOverviewComponent {
  public volumesCollection: Volume[] = [];

  getSearchData(data: Volume[]): void {
    this.volumesCollection = data;
    console.log(data)
  }
}
