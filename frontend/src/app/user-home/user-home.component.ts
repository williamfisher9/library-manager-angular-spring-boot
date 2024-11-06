import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { Item } from '../model/item';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  userId! : string | null;
  username! : string;
  password! : string;

  hideModal : string = "hidden";

  items : Item[] = [];

  constructor(private route : ActivatedRoute, private appService : AppService, private dataService : DataService){}

  ngOnInit() : void{
    this.route.queryParamMap.subscribe(paramMap  => {
      this.userId = paramMap.get('id');

      this.dataService.getUsername.subscribe(res => this.username = res);
      this.dataService.getPassword.subscribe(res => this.password = res)      

      this.appService.getUserHome(this.userId == null ? 0 : parseInt(this.userId), this.username, this.password)
      .subscribe({
        next: res => {this.items = res.response;},
        error: err => console.log(err)
      })

    });
  }

  showModal() {
    this.hideModal = "visible";
  }

  closeModal() {
    this.hideModal = "hidden";
  }

  inputValue : string = "";

  response! : any;

  showInputValue(){
    this.dataService.getUsername.subscribe(res => this.username = res);
      this.dataService.getPassword.subscribe(res => this.password = res)      

      this.appService.getDetails(this.inputValue, this.username, this.password)
      .subscribe({
        next: res => {this.response = JSON.parse(res.response);},
        error: err => console.log(err)
      })
  }

  addMovieToLibrary(response : any){
    this.appService.createMovieItem(this.userId == null ? 0 : parseInt(this.userId), this.username, this.password, response)
    .subscribe(res => {
      if(res.status == 200){
        this.hideModal = "hidden";

        this.appService.getUserHome(this.userId == null ? 0 : parseInt(this.userId), this.username, this.password)
      .subscribe({
        next: res => {this.items = res.response;},
        error: err => console.log(err)
      })
      }
    })
  }
}
