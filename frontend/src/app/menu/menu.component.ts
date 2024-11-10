import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from '../model/menu-item';
import { AppService } from '../services/app.service';
import { DataService } from '../services/data.service';
import { map, take, tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() menuItems : MenuItem[] = [];
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(private appService : AppService, private dataService : DataService, private router : Router){}

  callFunction(val : string) {
    switch(val){
      case 'logUserOut': { this.appService.logUserOut(); break; }
      case 'addItem': { this.newItemEvent.emit(); break; }
      default: console.log("something else was received!")
    }
  }

  handleLogoClick(){
    this.dataService.getUsername.pipe(take(1)).subscribe({
      next: res => {
        if(res == ''){
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/user-home']);
        }
      }
    });
  }
}
