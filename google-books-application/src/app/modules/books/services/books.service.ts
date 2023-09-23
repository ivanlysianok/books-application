import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { SearchParams } from '../models/search-params.interface';
import { BookItem } from '../models/book-item.interface';
import { BookCollection } from '../models/book-collection.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  /**
   * @description Get books and merge them with favorite books data by search params
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
            this.getBooksWithIsFavoriteFlag(
              booksCollection.items,
              favoriteBooks
            )
          )
        );
      })
    );
  }

  /**
   * @description Get books by passed search params
   * @param searchParams Search params (search term, start index...)
   * @returns Observable with book items
   */
  private getBooksBySearchParams(
    searchParams: SearchParams
  ): Observable<BookCollection> {
    return this.httpClient.get<BookCollection>(environment.booksApiUrl, {
      params: {
        q: searchParams.searchTerm,
        startIndex: searchParams.startIndex,
        maxResults: 30,
      },
    });
  }

  /**
   * @description Get list of favorite books and add isFavorite flag to each item
   * @returns Observable with favorite book items
   */
  public getFavoriteBooks(): Observable<BookItem[]> {
    return this.httpClient
      .get<BookCollection>(`${environment.favoriteShelfApiUrl}/volumes`)
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
   * @description Get books with isFavorite flag based on books list
   * and favorite books list
   * @param books List of books
   * @param favoriteBooks List of favorite books
   * @returns Transformed books with "isFavorite" flag
   */
  private getBooksWithIsFavoriteFlag(
    books: BookItem[],
    favoriteBooks: BookItem[]
  ): BookItem[] {
    return books.map((book) => ({
      ...book,
      isFavorite: this.checkForFavoriteBookById(book.id, favoriteBooks),
    }));
  }

  /**
   * @description Check for matching IDs from books list and
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
   * @description Add specific book to a "favorite" shelf by ID
   * @param id ID of book
   * @returns Observable void
   */
  public addBookToFavoriteById(id: string): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.favoriteShelfApiUrl}/addVolume`,
      {
        volumeId: id,
      }
    );
  }

  /**
   * @description Delete book from "favorite" shelf by ID
   * @param id ID of book
   * @returns Observable void
   */
  public deleteBookFromFavoriteById(id: string): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.favoriteShelfApiUrl}/removeVolume`,
      {
        volumeId: id,
      }
    );
  }

  /**
   * @description Delete all presented books from "favorite" shelf
   * @returns Observable void
   */
  public clearAllBooksFromFavoriteShelf(): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.favoriteShelfApiUrl}/clearVolumes`,
      {}
    );
  }
}
