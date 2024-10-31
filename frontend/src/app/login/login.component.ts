import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LoginRequest } from '../model/login-request';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private loginService : LoginService) {}

  submitLoginRequest() {
    let loginRequest = new LoginRequest(this.loginForm.value.username!, this.loginForm.value.password!);
    this.loginService.submitLoginRequest(loginRequest).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }
}
