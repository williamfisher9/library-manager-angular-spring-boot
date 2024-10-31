import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RegisterRequest } from '../model/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  createUser(user  : RegisterRequest) : Observable<any> {
    return this.http.post("http://localhost:9999/api/v1/public/signup", user).pipe(map(response => response));
  }

}
