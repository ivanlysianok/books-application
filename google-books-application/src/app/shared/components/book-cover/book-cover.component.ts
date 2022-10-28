import { Component, Input } from '@angular/core';
import { ImageLinks } from '../../../modules/books/models/volumeInfo/image-links.interface';

@Component({
  selector: 'app-book-cover',
  templateUrl: './book-cover.component.html',
  styleUrls: ['./book-cover.component.scss'],
})
export class BookCoverComponent {
  @Input() imageLinks?: ImageLinks;

  public placeholderImageUrl =
    'http://placehold.jp/e0e0e0/ffffff/250x250.png?text=No%20image';
}
