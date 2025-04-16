import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormsModule} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',

  imports: [ReactiveFormsModule, RouterOutlet, DatePipe, CommonModule, FormsModule],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent{
  date = new Date();
  //title = 'lab-attendance-login';
  errorMessage: string = '';
  loading = false;
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(`${this.username}:${this.password}`);
        console.log(response);
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("password", this.password);
        alert('Logged in!');
        this.router.navigate(['/drawer']);
      },
      error: (err) => {
        alert("Invalid Credentials");
      }
    });
  }

    
}


