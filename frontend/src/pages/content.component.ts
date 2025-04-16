import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormsModule} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './content.component.html',

  imports: [ReactiveFormsModule, RouterOutlet, DatePipe, CommonModule, FormsModule],
  styleUrls: ['./content.component.scss']
})

export class ContentComponent{
    constructor(private http: HttpClient) {}
    url = '';
    contentText = '';
    username: null | string = "";
    password: null | string = "";
    private authHeader: string | null = null;
    private backendAPI = "http://localhost:8081"

    ngOnInit(){      
      this.username = sessionStorage.getItem("username")!;
      this.password = sessionStorage.getItem("password")!;
      console.log(`${this.username}:${this.password}`);
    }

    submit(){
      this.submitContent(this.url, this.contentText);
    }

    submitContent(url: string, contentText: string) {
        //console.log(`${this.username}:${this.password}`);
        this.authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
        const headers = new HttpHeaders({
          'Authorization': this.authHeader
        });

        const body = {
          url,
          contentText
        };

        this.http.post(`${this.backendAPI}/api/content/submit`, body, { headers })
        .subscribe({
          next: (response) => {console.log('Submitted!', response); alert('Content Submitted!'); this.url = ""; this.contentText = "";},
          error: (err) => console.error('Submission failed:', err)
        });
    }
}
