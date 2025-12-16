import {inject} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

export class BaseService {

  private _snackBar = inject(MatSnackBar);

  protected httpClient = inject(HttpClient);

  protected handleError(error: HttpErrorResponse): Observable<never> {
    this._openSnackBar(error.message, true);
    if (error.status === 0) {
      console.error('An HTTP error occurred:', error.error);
    } else {
      console.error('Backend returned code', error.status, 'body was:', error.error);
    }

    return throwError(() => new Error('HTTP error occurred!'));
  }

  private _openSnackBar(message: string, isError: boolean = false): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
    });
  }

}
