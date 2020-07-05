import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { isArray } from 'util';

import { endpoint } from "../api-config";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  join(...paths: string[]): string {
    // Based on Python's os.path.join
    let output: string = '';
    paths.forEach(path => {
        if(path.startsWith('/')) {
            output = `${output}${path}`;
        } else {
            output = `${output}/${path}`;
        }
    })
    output = output.endsWith('/') ? output : output + '/'
    // We need to remove the first character because that's a '/'
    return output.substring(1);
}

  private prepare_endpoint(paths: string|string[], id?: number): string {
    let _paths = isArray(paths) ? paths : [paths];
    if(_paths[0] !== endpoint) {
      (_paths as string[]).unshift(endpoint);
    }
    let _endpoint = this.join(...(_paths as string[]));
    return id ? this.join(_endpoint, id.toString()) : _endpoint;
  }

  get<T>(paths: string|string[], id?: number): Observable<T> {
    let _endpoint = this.prepare_endpoint(paths, id);
    return this.http.get<T>(_endpoint).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(paths: string|string[], body: {}, options?: {headers: HttpHeaders}): Observable<T> {
    let _endpoint = this.prepare_endpoint(paths);
    return this.http.post<T>(_endpoint, body, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
