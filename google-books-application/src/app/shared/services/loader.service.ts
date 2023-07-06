import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private isLoadingSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject$.asObservable();

  /**
   * This method fires loader, loading subject value
   * sets to TRUE
   */
  public start(): void {
    this.isLoadingSubject$.next(true);
  }

  /**
   * This method stops loader, loading subject value
   * sets to FALSE
   */
  public stop(): void {
    this.isLoadingSubject$.next(false);
  }
}
