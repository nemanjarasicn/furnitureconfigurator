import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { User } from '../../common/models/interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  endpointURL: string = 'https://niemann-moebelplaner.de/backend/account';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    }),
  };

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  logout(): Observable<boolean> {
    return this.http.post<boolean>(
      this.endpointURL + '/logout',
      {},
      this.httpOptions
    );
  }

  login(
    email: string,
    pass: string
  ): Observable<[boolean, string | undefined]> {
    return this.http.post<[boolean, string | undefined]>(
      this.endpointURL + '/login',
      {
        email: email,
        pass: pass,
      },
      this.httpOptions
    );
  }

  register(user: User): Observable<[boolean, string | undefined]> {
    return this.http.post<[boolean, string | undefined]>(
      this.endpointURL + '/register',
      user,
      this.httpOptions
    );
  }

  isUserLoggedIn(): Observable<User | false> {
    return this.http.post<User | false>(
      this.endpointURL + '/getUser',
      {},
      this.httpOptions
    );
  }
}
