import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-list-items',
  templateUrl: './book-list-items.component.html',
})
export class BookListItemsComponent {
  @Input({ required: true }) items?: string[];
}
