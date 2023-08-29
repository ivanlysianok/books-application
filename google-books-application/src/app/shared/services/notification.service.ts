import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  /**
   * Show material snackbar according to passed message and duration
   * @param message Message to show
   * @param duration Duration in miliseconds, by default is 3000
   */
  public showSnackbar(message: string, duration?: number): void {
    this.snackbar.open(message, undefined, {
      duration: duration ? duration : 3000,
    });
  }
}
