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
    if(this.router.url == '/register'){
      this.appService.getPublicMenuItems().subscribe((res) => {this.menuItems = res.response})
    }
  }

  registerForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    emailAddress: new FormControl(""),
    password: new FormControl(""),
    roles : new FormControl(["ROLE_USER"])
  })

  errors = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    credentials: ''
  };

  submitRegisterForm() {
    this.errors = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      credentials: ''
    };

    let hasErrors = false;

    if(this.registerForm.value.firstName == ''){
      this.errors.firstName = 'First name field should not be empty';
      hasErrors = true;
    }

    if(this.registerForm.value.lastName == ''){
      this.errors.lastName = 'Last name field should not be empty';
      hasErrors = true;
    }

    if(this.registerForm.value.emailAddress == ''){
      this.errors.emailAddress = 'Email address field should not be empty';
      hasErrors = true;
    }

    if(this.registerForm.value.password == ''){
      this.errors.password = 'Password field should not be empty';
      hasErrors = true;
    }

    if(!hasErrors){
      let registerRequest = new RegisterRequest(this.registerForm.value.firstName!, this.registerForm.value.lastName!, 
        this.registerForm.value.emailAddress!, this.registerForm.value.password!, this.registerForm.value.roles!);
      
      this.registerService.createUser(registerRequest).subscribe({
        next: response => {
          if(response.status == 200){
            this.router.navigate(['/login']);
          }
        },
        error: err => {
          this.errors.credentials = err.error.error;
        }
      })
    }
  }

}
