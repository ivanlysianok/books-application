import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { keys } from 'src/app/credentials/api-keys';
import { CollectionResultModel } from 'src/app/shared/models/collection-result.intereface';
import { VolumeUrls } from '../constants/volume-urls.constant';
import { SearchParams } from '../models/search-params.interface';
import { Volume } from '../models/volumes.interface';

@Injectable()
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  /**
   * This method is used for getting collection of volumes (books) according to
   * given paramets
   * @param searchParams "q" param is used like search term
   * @returns Observable with collection of volumes, type of Volume[];
   */
  public getBooksCollection(
    searchParams: SearchParams
  ): Observable<CollectionResultModel<Volume[]>> {
    return this.httpClient.get<CollectionResultModel<Volume[]>>(
      `${VolumeUrls.baseUrl}/volumes`,
      {
        params: {
          ...searchParams,
          key: keys.googleBooksApiKey,
        },
      }
    );
  }

  /**
   * This method is used for gets specific volume data
   * @param volumeId ID of volume. Can be get from getBooksCollection()
   * @returns Observable with specific volume
   * @see getBooksCollection
   */
  public getBookById(volumeId: string): Observable<Volume> {
    return this.httpClient.get<Volume>(
      `${VolumeUrls.baseUrl}/volumes/${volumeId}`
    );
  }
}
