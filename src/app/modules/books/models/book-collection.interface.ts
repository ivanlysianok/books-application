import { BookItem } from './book-item.interface';

export interface BookCollection {
  totalItems: number;
  items: BookItem[];
}
