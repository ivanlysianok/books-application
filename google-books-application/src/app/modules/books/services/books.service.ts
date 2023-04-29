import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { keys } from 'src/app/credentials/api-keys';
import { SearchParams } from '../models/search-params.interface';
import { BookItem } from '../models/book-item.interface';
import { CollectionResultModel } from '../../../shared/models/collection-result.interface';

@Injectable()
export class BooksService {
  private baseUri = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient: HttpClient) {}

  /**
   * Get collection of books according to given parametrs
   * @param searchParams Search params
   * @returns Collection of books type of @see{@link Volume}
   */
  public getBooksCollection(
    searchParams: SearchParams
  ): Observable<CollectionResultModel<BookItem[]>> {
    return this.httpClient.get<CollectionResultModel<BookItem[]>>(
      this.baseUri,
      {
        params: {
          q: searchParams.searchTerm,
          subject: searchParams.category,
          orderBy: searchParams.orderBy ? searchParams.orderBy : 'relevance',
          startIndex: searchParams.startIndex,
          maxResults: 30,
          key: keys.googleBooksApiKey,
        },
      }
    );
  }

  /**
   * Get specific book by ID
   * @param bookId ID of specific book
   * @returns Observable with current book item
   */
  public getBookById(bookId: string): Observable<BookItem> {
    return this.httpClient.get<BookItem>(`${this.baseUri}/${bookId}`);
  }
}
