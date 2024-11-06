import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http : HttpClient) { }

  getUserHome(id : number, username : string, password : string) : Observable<any> {
    return this.http.post("http://localhost:9999/api/v1/user/home", {userId: id}, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
      .pipe(map(response => response));
  }

  getDetails(name : string, username : string, password : string) : Observable<any> {
    return this.http.get(`http://localhost:9999/api/v1/user/get-details/${name}`, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
      .pipe(map(response => response));
  }

  createMovieItem(id : number, username : string, password : string, item : any) : Observable<any> {
    return this.http.post("http://localhost:9999/api/v1/user/create-item", {userId: id, poster: item.Poster, rating: item.imdbRating, year: item.Year, name: item.Title}, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
      .pipe(map(response => response)); 
  }
}
