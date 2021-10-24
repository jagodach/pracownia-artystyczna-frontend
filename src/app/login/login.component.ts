import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginResponse } from './LoginResponse';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private jwtHelper :JwtHelperService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

  public Login(loginForm: NgForm){
    this.loginService.Login(loginForm.value).subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('token', response.token.toString());
        console.log(JSON.stringify(this.jwtHelper.decodeToken(response.token.toString())));
        var tokenPayload = this.jwtHelper.decodeToken(response.token.toString());
        var roles = tokenPayload.role;
        if (roles[0].authority == 'ADMIN'){
          
        }
        else{
          this.router.navigate(['/participants']);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
