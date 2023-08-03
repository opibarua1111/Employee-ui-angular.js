import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    SearchName: string,
    Designation: string,
    MinAge: number,
    MaxAge: number,
    Page: number,
    Size: number
  ) {
    return this.http.get<any[]>(this.baseurl, {
      params: new HttpParams()
        .set('SearchName', SearchName ? SearchName : '')
        .set('Designation', Designation ? Designation : '')
        .set('MinAge', MinAge ? MinAge : '')
        .set('MaxAge', MaxAge ? MaxAge : '')
        .set('Page', Page ? Page : '')
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
    let url = this.baseurl + 'editEmployee/' + id;
    return this.http.post(url, employee, { responseType: 'text' });
  }
  deleteEmployee(id: string) {
    let url = this.baseurl + id;
    return this.http.put(url, '', { responseType: 'text' });
  }
}
