import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Sidebar, SidebarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './drawer.component.html',

  imports: [ReactiveFormsModule, RouterOutlet, DatePipe, CommonModule, SidebarModule, RouterModule],
  styleUrls: ['./drawer.component.scss']
})

export class DrawerComponent{
    constructor(private http: HttpClient, private router: Router) {}
    private backendAPI = "http://localhost:8081"
    username: string = "";

    ngOnInit(){
      this.username = sessionStorage.getItem("username")!;
    }

    logout(){
      this.router.navigate(['/login']);
    }
}
