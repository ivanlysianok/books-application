import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  public isLoading: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);
  public isLoading$ = this.isLoading.asObservable();

  /**
   * This method fires loader, loading subject value
   * sets to TRUE
   */
  start(): void {
    this.isLoading.next(true);
  }

  /**
   * This method stops loader, loading subject value
   * sets to FALSE
   */
  stop(): void {
    this.isLoading.next(false);
  }
}
