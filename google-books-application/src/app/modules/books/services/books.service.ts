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
  private readonly booksVolumesUri = `${environment.apiUrl}books/v1/volumes`;
  private readonly bookshelvesUri = `${environment.apiUrl}books/v1/mylibrary/bookshelves`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get books by passed search params
   * @param searchParams Search params (search term, start index...)
   * @returns Observable with book items
   */
  private getBooksBySearchParams(
    searchParams: SearchParams
  ): Observable<BookCollection> {
    return this.httpClient.get<BookCollection>(this.booksVolumesUri, {
      params: {
        q: searchParams.searchTerm,
        startIndex: searchParams.startIndex,
        maxResults: 30,
      },
    });
  }

  /**
   * Get favorite books and add isFavorite flag to each item
   * @returns Observable with favorite book items
   */
  public getFavoriteBooks(): Observable<BookItem[]> {
    return this.httpClient
      .get<BookCollection>(
        `${this.bookshelvesUri}/${BookShelves.Favorite}/volumes`
      )
      .pipe(
        map((booksCollection) => {
          if (!booksCollection || !booksCollection.items) {
            return [];
          }
          return booksCollection.items.map((book) => ({
            ...book,
            isFavorite: true,
          }));
        })
      );
  }

  /**
   * Get books and merge them with favorite books data by search params
   * @param searchParams Search params (search term, start index...)
   * @returns Observable with "complete" books data
   */
  public getBookItems(searchParams: SearchParams): Observable<BookItem[]> {
    return this.getBooksBySearchParams(searchParams).pipe(
      switchMap((booksCollection) => {
        if (!booksCollection || !booksCollection.items) {
          return [];
        }
        return this.getFavoriteBooks().pipe(
          map((favoriteBooks) =>
            this.getTransformedBooks(booksCollection.items, favoriteBooks)
          )
        );
      })
    );
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
   * Check for matching IDs from books list and
   * favorite books list to get known if book has
   * favorite flag or not
   * @param id Book ID
   * @param favoriteBookItems Favorite book items
   * @returns TRUE if IDs match, otherwise FALSE
   */
  private checkForFavoriteBookById(
    id: string,
    favoriteBookItems: BookItem[]
  ): boolean {
    return favoriteBookItems?.some((favBook) => favBook.id === id);
  }

  /**
   * Add specific book to a "favorite" shelf by ID
   * @param id ID of book
   */
  public addBookToFavoriteById(id: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.bookshelvesUri}/${BookShelves.Favorite}/addVolume`,
      {
        volumeId: id,
      }
    );
  }

  /**
   * Delete book from "favorite" shelf by ID
   * @param id ID of book
   */
  public deleteBookFromFavoriteById(id: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.bookshelvesUri}/${BookShelves.Favorite}/removeVolume`,
      {
        volumeId: id,
      }
    );
  }
}
