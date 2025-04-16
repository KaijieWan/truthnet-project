import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeader: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string){
    this.authHeader = 'Basic ' + btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': this.authHeader
    });
    return this.http.get<any>("http://localhost:8081/api/content", { headers });
  }

  loginAlt(username: string, password: string): Observable<boolean> {
    this.authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': this.authHeader
    });

    return this.http.get('http://localhost:8081/api/content', { headers }).pipe(
        tap(() => this.loggedIn.next(true)),
        tap(() => console.log("Login successful")),
        catchError(() => {
          this.authHeader = null;
          this.loggedIn.next(false);
          return of(false);
        }),
        tap(success => {
          if (!success) alert("Login failed: invalid credentials");
        }),
        map(() => true),
        catchError(() => of(false)) // in case any other error slipped through
      );
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.authHeader ?? ''
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.authHeader = null;
    this.loggedIn.next(false);
  }
}
