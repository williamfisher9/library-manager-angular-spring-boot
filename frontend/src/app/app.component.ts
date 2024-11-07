import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  constructor(private router : Router){}

  ngOnInit() {
    console.log("------------------")
    console.log(this.router.url)
  }

}
