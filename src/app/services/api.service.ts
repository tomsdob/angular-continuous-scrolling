import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

// Types
import { APIData } from '../types/APIData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`An error has occured: ${error.error}`);
    } else {
      console.error(
        `Back-end returned a status code of ${error.status}, body: ${error.error}`
      );
    }

    return throwError(
      () => new Error('An error occured, please try again later.')
    );
  }

  getData(page?: number): Observable<APIData> {
    const options = page ? { params: new HttpParams().set('page', page) } : {};

    return this.http
      .get<APIData>(this.apiURL, options)
      .pipe(catchError(this.handleError));
  }
}
