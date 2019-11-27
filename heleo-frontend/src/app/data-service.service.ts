import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>('http://localhost:3000/api/allCompany');
  }
  addCompany(data) {
    return this.http.post<any>(`http://localhost:3000/api/company`, data)
  }
  deleteCompany(id) {
    return this.http.delete<any>(`http://localhost:3000/api/company/` + id)
  }
  updateCompany(id, data) {
    return this.http.put<any>(`http://localhost:3000/api/company/` + id, data)
  }
  getById(id) {
    return this.http.get<any>(`http://localhost:3000/api/company/` + id)
  }
}
