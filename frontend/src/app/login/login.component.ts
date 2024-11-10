import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LoginRequest } from '../model/login-request';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuComponent } from "../menu/menu.component";
import { MenuItem } from '../model/menu-item';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl("hamza.hamdan@hotmail.com"),
    password: new FormControl("12345678")
  })

  errors = {
    username: "",
    password: "",
    credentials: ''
  }

  constructor(private loginService : LoginService, private router : Router, private dataService : DataService, private appService : AppService) {}

  menuItems:MenuItem[] = [];
  ngOnInit() {
    if(this.router.url == '/login'){
      this.appService.getPublicMenuItems().subscribe((res) => {this.menuItems = res.response})
    }
  }

  submitLoginRequest() {
    this.errors = {username: '', password: '', credentials: ''};
    let hasErrors = false;

    if(this.loginForm.value.username == ''){
      this.errors.username = 'Username field should not be empty';
      hasErrors = true;
    }

    if(this.loginForm.value.password == ''){
      this.errors.password = 'Password field should not be empty';
      hasErrors = true;
    }

    if(!hasErrors){
      let loginRequest = new LoginRequest(this.loginForm.value.username!, this.loginForm.value.password!);
    this.loginService.submitLoginRequest(loginRequest).subscribe({
      next: response => {
        if(response.status == 200){
          this.dataService.setAuthenticated(true);
          this.dataService.setUserId(response.response.principal.id);
          this.dataService.setUsername(this.loginForm.value.username!);
          this.dataService.setPassword(this.loginForm.value.password!);
          this.router.navigate(['/user-home'])
        }
      },
      error: err => {
        this.errors.credentials = 'Invalid username/password'
      }
    })
    }
    
  }
}
