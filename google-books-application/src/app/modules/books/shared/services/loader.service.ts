import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  public loading = new Subject<boolean>();

  /**
   * This method fires loader, loading subject value
   * sets to TRUE
   */
  start(): void {
    this.loading.next(true);
  }

  /**
   * This method stops loader, loading subject value
   * sets to FALSE
   */
  stop(): void {
    this.loading.next(false);
  }
}
