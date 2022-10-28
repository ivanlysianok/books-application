import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { keys } from 'src/app/credentials/api-keys';
import { SearchParams } from '../models/search-params.interface';
import { Volume } from '../models/volume.interface';
import { CollectionResultModel } from '../../../shared/models/collection-result.interface';

@Injectable()
export class BooksService {
  private baseUri = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient: HttpClient) {}

  /**
   * Get collection of books according to given paramets
   * @param searchParams Search params
   * @returns Collection of books type of @see{@link Volume}
   */
  public getBooks(
    searchParams: SearchParams
  ): Observable<CollectionResultModel<Volume[]>> {
    return this.httpClient.get<CollectionResultModel<Volume[]>>(this.baseUri, {
      params: {
        q: searchParams.searchTerm,
        subject: searchParams.category,
        orderBy: searchParams.orderBy ? searchParams.orderBy : 'relevance',
        startIndex: searchParams.startIndex,
        maxResults: 30,
        key: keys.googleBooksApiKey,
      },
    });
  }

  /**
   * Get specific book by ID
   * @param bookId ID of specific book
   * @returns Observable with specific volume
   * @see getBooksCollection
   */
  public getBook(bookId: string): Observable<Volume> {
    return this.httpClient.get<Volume>(`${this.baseUri}/${bookId}`);
  }
}
