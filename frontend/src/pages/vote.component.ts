import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './vote.component.html',

  imports: [ReactiveFormsModule, RouterOutlet, DatePipe, CommonModule],
  styleUrls: ['./vote.component.scss']
})

export class VoteComponent{
    constructor(private http: HttpClient) {}
    username: null | string = "";
    password: null | string = "";
    allContent: any[] = [];
    private authHeader: string | null = null;
    private backendAPI = "http://localhost:8081"

    ngOnInit(){
        this.username = sessionStorage.getItem("username")!;
        this.password = sessionStorage.getItem("password")!;
        this.authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
        const headers = new HttpHeaders({
          'Authorization': this.authHeader
        });

        this.http.get<any[]>(`${this.backendAPI}/api/content/allContent`, { headers }).subscribe(
          (response) => {
            console.log(response);
            this.allContent = response;
        });
    }
    
    confirmVote(contentId: string, voteType: string){
      Swal.fire({
          title: `Add an explanation for the vote given`,
          input: 'text',
          inputPlaceholder: "Enter explanation...",
          showCancelButton: true,
          confirmButtonText: 'Submit',
          preConfirm: (value) => {
            if (value.length > 1000) {
                  Swal.showValidationMessage('!');
                  return false;
              }
            else if (value.length == 0){
                  Swal.showValidationMessage('Please add an explanation or select Cancel!');
                  return false;
            }
              return value;
          }
        }).then((result) => {
          if (result.isConfirmed) {    
            this.submitVote(contentId, voteType, result.value);
            Swal.fire('Vote Submitted!', `Explanation entered: ${result.value}`, 'success');
          }
        });
    }

    submitVote(contentId: string, voteType: string, explanation: string) {
        this.authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
        const headers = new HttpHeaders({
          'Authorization': this.authHeader
        });

        this.http.post(`${this.backendAPI}/api/vote`, {
        content: { id: contentId },
        voteType,
        explanation,
        }, { headers }).subscribe(() => {
            console.log('Vote submitted!');
        });
    }
}
