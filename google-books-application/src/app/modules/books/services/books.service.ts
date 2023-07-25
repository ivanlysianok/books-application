import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { SearchParams } from '../models/search-params.interface';
import { BookItem } from '../models/book-item.interface';
import { environment } from '../../../../environments/environment';
import { BookShelves } from '../enums/book-shelves.enum';
import { BookCollection } from '../models/book-collection.interface';

@Injectable()
export class BooksService {
  private booksVolumesUri = `${environment.apiUrl}books/v1/volumes`;
  private bookshelvesUri = `${environment.apiUrl}books/v1/mylibrary/bookshelves`;

  constructor(private http: HttpClient) {}

  /**
   * Get books collection by search params
   * @param searchParams Search params (search term, start index...)
   * @returns Observable with books collection
   */
  private getBooksBySearchParams(
    searchParams: SearchParams
  ): Observable<BookCollection> {
    return this.http.get<BookCollection>(this.booksVolumesUri, {
      params: {
        q: searchParams.searchTerm,
        startIndex: searchParams.startIndex,
        maxResults: 30,
      },
    });
  }

  /**
   * Get favorite books
   * @returns Observable with favorite books
   */
  private getFavoriteBooks(): Observable<BookCollection> {
    return this.http.get<BookCollection>(
      `${this.bookshelvesUri}/${BookShelves.Favorite}/volumes`
    );
  }

  /**
   * Check for matching IDs from books collection and
   * favorite books collection to get known if book is
   * favorite or not
   * @param id Book ID
   * @param favoriteBookItems Favorite book items
   * @returns TRUE if IDs match, otherwise FALSE
   */
  private checkForFavoriteBookById(
    id: string,
    favoriteBookItems: BookItem[]
  ): boolean {
    return favoriteBookItems.some((favBook) => favBook.id === id);
  }

  /**
   * Get transformed books data with isFavorite flag
   * @param books List of books
   * @param favoriteBooks List of favorite books
   * @returns Transformed books with "isFavorite" flag
   */
  private getTransformedBooks(
    books: BookItem[],
    favoriteBooks: BookItem[]
  ): BookItem[] {
    return books.map((book) => ({
      ...book,
      isFavorite: this.checkForFavoriteBookById(book.id, favoriteBooks),
    }));
  }

  /**
   * Get books collection and merge them with
   * favorite books data by search params
   * @param searchParams Search params (search term, start index...)
   * @returns Observable with "complete" books data
   */
  public getBooksCollection(
    searchParams: SearchParams
  ): Observable<BookCollection> {
    return this.getBooksBySearchParams(searchParams).pipe(
      switchMap((books) =>
        this.getFavoriteBooks().pipe(
          map((favoriteBooks) => ({
            totalItems: books.totalItems,
            items: this.getTransformedBooks(books.items, favoriteBooks.items),
          }))
        )
      )
    );
  }

  /**
   * Get book by ID
   * @param bookId ID of specific book
   * @returns Observable with current book item
   */
  public getBookById(bookId: string): Observable<BookItem> {
    return this.http.get<BookItem>(`${this.booksVolumesUri}/${bookId}`);
  }
}
