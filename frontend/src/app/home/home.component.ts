import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { MenuItem } from '../model/menu-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private appService : AppService) {}

  menuItems:MenuItem[] = [];
  ngOnInit() {
    console.log(this.router.url)
    if(this.router.url == '/'){
      console.log("yesss")
      this.appService.getPublicMenuItems().subscribe((res) => {this.menuItems = res.response; console.log(this.menuItems)})
    }
  }
}
