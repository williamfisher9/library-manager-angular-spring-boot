import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LoginRequest } from '../model/login-request';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl("hamza.hamdan@hotmail.com"),
    password: new FormControl("12345678")
  })

  constructor(private loginService : LoginService, private router : Router, private dataService : DataService) {}

  submitLoginRequest() {
    let loginRequest = new LoginRequest(this.loginForm.value.username!, this.loginForm.value.password!);
    this.loginService.submitLoginRequest(loginRequest).subscribe({
      next: response => {
        if(response.status == 200){
          this.dataService.setAuthenticated(true);
          this.dataService.setUserId(response.response.principal.id);
          this.dataService.setUsername(this.loginForm.value.username!);
          this.dataService.setPassword(this.loginForm.value.password!);
          this.router.navigate(['/user-home'], { queryParams: {id: response.response.principal.id}})
        }
      },
      error: err => console.log(err)
    })
  }
}
