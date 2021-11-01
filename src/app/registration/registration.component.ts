import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { RegistrationRequest } from './registrationRequest';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  public Register(registerForm: NgForm){
    if (registerForm.value.password === registerForm.value.passwordRepeat){
      let registrationRequest: RegistrationRequest = {
        firstName : registerForm.value.firstName,
        lastName : registerForm.value.lastName,
        password : registerForm.value.password,
        phone : registerForm.value.phone,
        email : registerForm.value.email
      }
      this.registerService.Register(registrationRequest).subscribe(
        (response: Response) => {
          console.log('ok');
        },
        (error: HttpErrorResponse) => {
          console.log('error');
        }
      )
    }
    else {
      alert('Hasła nie zgadzają się');
    }
  }
}
