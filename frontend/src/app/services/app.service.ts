import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http : HttpClient, private dataService : DataService, private router : Router) { }

  getUserHome(id : number | string, username : string, password : string) : Observable<any> {
    return this.http.post("http://localhost:9999/api/v1/user/home", {userId: id}, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
      .pipe(map(response => response));
  }

  getDetails(name : string, year : string, username : string, password : string) : Observable<any> {
    return this.http.get(`http://localhost:9999/api/v1/user/get-details/${name}/${year != '' ? year : 'nill'}`, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
      .pipe(map(response => response));
  }

  createMovieItem(userId : number | string, username : string, password : string, item : any) : Observable<any> {
    return this.http.post("http://localhost:9999/api/v1/user/create-item", {userId: userId, poster: item.Poster, rating: item.imdbRating, year: item.Year, name: item.Title, details: JSON.stringify(item)}, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
      .pipe(map(response => response)); 
  }

  getPublicMenuItems() : Observable<any>{
    return this.http.get("http://localhost:9999/api/v1/public/get-menu").pipe(map(res => res))
  }

  getPrivateMenuItems(username : string, password : string, type : string) : Observable<any>{
    return this.http.get(`http://localhost:9999/api/v1/user/get-menu/${type}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}}).pipe(map(res => res))
  }

  logUserOut(){
    this.dataService.logUserOut();
    this.router.navigate(['/']);
  }

  deleteItemById(id:number, username : string, password : string, userId : number | string) : Observable<any>{
    return this.http.delete(`http://localhost:9999/api/v1/user/${userId}/item/${id}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}}).pipe(map(res => res))
  }

  getItemById(id : any, username : string, password : string) : Observable<any> {
    return this.http.get<any>("http://localhost:9999/api/v1/user/item/"+id, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
    .pipe(map(res => res.response));
  }

  searchItemByName(name : string, username : string, password : string, userId : string | number) : Observable<any> {
    return this.http.get<any>(`http://localhost:9999/api/v1/user/${userId}/search/${name == "" ? "nill" : name}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
    .pipe(map(res => res.response));
  }
}
