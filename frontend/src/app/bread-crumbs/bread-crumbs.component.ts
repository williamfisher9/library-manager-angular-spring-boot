import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  standalone: true,
  imports: [],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.css'
})
export class BreadCrumbsComponent {
  @Input() links : string[] = [];

  constructor(private router : Router){}

  navigateToHome(){
    this.router.navigate(['/user-home']);
  }
}
