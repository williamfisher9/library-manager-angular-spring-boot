import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RegisterRequest } from '../model/register-request';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private registerService : RegisterService) {}

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
