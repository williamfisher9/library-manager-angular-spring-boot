import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../model/menu-item';
import { AppService } from '../services/app.service';

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

  constructor(private appService : AppService){}

  callFunction(val : string) {
    switch(val){
      case 'logUserOut': { this.appService.logUserOut(); break; }
      case 'addItem': { this.newItemEvent.emit(); break; }
      default: console.log("something else was received!")
    }
  }
}
