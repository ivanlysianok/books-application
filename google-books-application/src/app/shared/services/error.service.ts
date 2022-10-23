import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorService {
  constructor(private toastrService: ToastrService) {}

  /**
   * This method fired error toast
   * @param errResponse HTTP error response from api
   */
  public error(errResponse: HttpErrorResponse): void {
    this.toastrService.error(
      errResponse.error.error.message,
      'An error has occurred'
    );
  }
}
