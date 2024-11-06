import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  submitLoginRequest(loginRequest : LoginRequest) : Observable<any> {
    return this.http.post("http://localhost:9999/api/v1/public/login"
      , null,{headers: {"Authorization": `Basic ${btoa(loginRequest.username + ':' + loginRequest.password)}`}})
      .pipe(map(response => response));
  }
}