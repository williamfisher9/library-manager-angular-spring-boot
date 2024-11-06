import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private authenticated = new BehaviorSubject<boolean>(false);
  private userId = new BehaviorSubject<number>(0);
  private username = new BehaviorSubject<string>("");
  private password = new BehaviorSubject<string>("");

  isAuthenticated = this.authenticated.asObservable();
  getUserId = this.userId.asObservable();
  getUsername = this.username.asObservable();
  getPassword = this.password.asObservable();

  constructor() { }

  setAuthenticated(val : boolean) {
    this.authenticated.next(val);
  }

  setUserId(val : number) {
    this.userId.next(val);
  }

  setUsername(val : string) {
    this.username.next(val);
  }

  setPassword(val : string) {
    this.password.next(val);
  }
}
