import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorService {
  constructor(private toastrService: ToastrService) {}

  /**
   * Show error message in right corner with error title and message
   * @param errResponse HTTP error response from API
   */
  public error(httpErrorRes: HttpErrorResponse): void {
    this.toastrService.error(
      httpErrorRes.error.error.message,
      'An error has occurred',
      {
        timeOut: 8000,
        extendedTimeOut: 8000,
        progressBar: true,
        closeButton: true,
      }
    );
  }
}
