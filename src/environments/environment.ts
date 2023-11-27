import { BookShelves } from 'src/app/modules/books/enums/book-shelves.enum';

export const environment = {
  production: false,
  apiUrl: 'https://www.googleapis.com/',
  booksApiUrl: 'https://www.googleapis.com/books/v1/volumes',
  favoriteShelfApiUrl:
    'https://www.googleapis.com/books/v1/mylibrary/bookshelves/' +
    BookShelves.Favorite,
};
