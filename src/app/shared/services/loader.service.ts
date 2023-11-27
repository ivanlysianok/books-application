import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  /**
   * @description Subject that controls wheter loading is fired or not
   */
  private isLoadingSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  /**
   * @description Data stream to get loading data
   */
  public isLoading$: Observable<boolean> =
    this.isLoadingSubject$.asObservable();

  /**
   * @description Start loader and sets loading subject to TRUE
   */
  public start(): void {
    this.isLoadingSubject$.next(true);
  }

  /**
   * @description Stop loader and sets loading subject to FALSE
   */
  public stop(): void {
    this.isLoadingSubject$.next(false);
  }
}
