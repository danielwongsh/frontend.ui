import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('authToken', response.jwt)
        //this.router.navigate(['/maintain-events']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  refreshToken() {
    this.authService.refreshToken().subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('authToken', response.jwt)
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
