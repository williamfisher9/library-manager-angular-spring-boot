import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RegisterRequest } from '../model/register-request';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { MenuItem } from '../model/menu-item';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MenuComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private registerService : RegisterService, private router : Router, private appService : AppService) {}

  menuItems:MenuItem[] = [];
  ngOnInit() {
    console.log(this.router.url)
    if(this.router.url == '/register'){
      this.appService.getPublicMenuItems().subscribe((res) => {this.menuItems = res.response; console.log(this.menuItems)})
    }
  }

  registerForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    emailAddress: new FormControl(""),
    password: new FormControl(""),
    roles : new FormControl(["ROLE_USER"])
  })

  submitRegisterForm() {

    let registerRequest = new RegisterRequest(this.registerForm.value.firstName!, this.registerForm.value.lastName!, 
      this.registerForm.value.emailAddress!, this.registerForm.value.password!, this.registerForm.value.roles!);
    
    this.registerService.createUser(registerRequest).subscribe({
      next: response => console.log(response.status),
      error: err => console.log(err.error)
    })
  }

}
