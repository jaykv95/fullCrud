import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from './user'
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  signUp(user: User) {
    return this.http.post<any>(`http://localhost:3000/auth/signup`, user).pipe(map(data => {
      if (data) {
        localStorage.setItem('currentUser',  JSON.stringify(data.result.token))
        this.currentUserSubject.next(data.result.token);
      }
      return data;
    }))
  }
  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/auth/login`, { email, password })
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user.result.token))
          console.log(user.result.token)
          this.currentUserSubject.next(user.result.token);
        }
        return user;
      }))
  }
}
