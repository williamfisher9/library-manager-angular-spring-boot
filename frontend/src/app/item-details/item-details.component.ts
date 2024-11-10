import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { MenuItem } from '../model/menu-item';
import { AppService } from '../services/app.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  constructor(private appService : AppService, private dataService : DataService){}

  userId!: string | number;
  username!: string;
  password!: string;

  menuItems : MenuItem[] = [];
  ngOnInit(): void {
    this.dataService.getUsername.subscribe((res) => (this.username = res));
    this.dataService.getPassword.subscribe((res) => (this.password = res));
    this.dataService.getUserId.subscribe((res) => (this.userId = res));

    this.appService
      .getPrivateMenuItems(this.username, this.password)
      .subscribe((res) => {
        this.menuItems = res.response;
  });
}
}
