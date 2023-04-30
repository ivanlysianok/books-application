import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private isLoading: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);
  public isLoading$ = this.isLoading.asObservable();

  /**
   * This method fires loader, loading subject value
   * sets to TRUE
   */
  public start(): void {
    this.isLoading.next(true);
  }

  /**
   * This method stops loader, loading subject value
   * sets to FALSE
   */
  public stop(): void {
    this.isLoading.next(false);
  }
}
