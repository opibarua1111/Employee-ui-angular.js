import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Employee } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  baseurl = 'https://localhost:7073/api/Employee/';

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee) {
    let url = this.baseurl;
    return this.http.post(url, employee, { responseType: 'text' });
  }

  getQueryEmployees(
    Page: number,
    SearchName: string,
    Designation: string,
    MinAge: string,
    MaxAge: string,
    Size: number
  ) {
    return this.http.get<any[]>(this.baseurl, {
      params: new HttpParams()
        .set('Page', Page ? Page : '')
        .set('SearchName', SearchName ? SearchName : '')
        .set('Designation', Designation ? Designation : '')
        .set('MinAge', MinAge ? MinAge : '')
        .set('MaxAge', MaxAge ? MaxAge : '')
        .set('Size', Size ? Size : ''),
    });
  }

  getEmployees(Page: number, Size: number) {
    return this.http.get<any[]>(this.baseurl, {
      params: new HttpParams()
        .set('Page', Page ? Page : '')
        .set('Size', Size ? Size : ''),
    });
  }

  getEmployee(id: string) {
    let url = this.baseurl + id;
    return this.http.get(url);
  }

  editEmployee(employee: Employee, id: string) {
    let url = this.baseurl + id;
    return this.http.post(url, employee, { responseType: 'text' }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  deleteEmployee(id: string) {
    let url = this.baseurl + id;
    return this.http.put(url, '', { responseType: 'text' });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
