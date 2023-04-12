import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITypeProbleme } from './probleme';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypesProblemeService {
  
  private baseUrl = 'api/typesprobleme';

  constructor(private _http: HttpClient) {

  }


  obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
    return this._http.get<ITypeProbleme[]>(this.baseUrl).pipe(
      tap((data) => {
        console.log("obtenirTypesProbleme : " + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  // obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
  //   return this._http.get<ITypeProbleme[]>(this.baseUrl).pipe(
  //       tap(data => console.log('obtenirTypesProbleme: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //   );
  // }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

};
