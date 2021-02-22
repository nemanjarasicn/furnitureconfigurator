import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { User } from '../../common/models/interfaces/user.interface';
import { Customer } from '../../common/models/interfaces/customer.interface';
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
        password: pass,
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

  verify(
    userID: string,
    code: string
  ): Observable<[boolean, string | undefined]> {
    return this.http.post<[boolean, string | undefined]>(
      this.endpointURL + '/verify',
      {
        id: userID,
        code: code,
      },
      this.httpOptions
    );
  }

  sendOrder(
    customer: Customer,
    order: any //for now
  ): Observable<[boolean, string | undefined]> {
    return this.http.post<[boolean, string | undefined]>(
      this.endpointURL + '/sendOrder',
      {
        customer: customer,
        order: order,
      },
      this.httpOptions
    );
  }

  // Hex function for ArrayBuffer
  hex(buff: any): any {
    return [].map
      .call(new Uint8Array(buff), (b: any) => ('00' + b.toString(16)).slice(-2))
      .join('');
  }

  // Base64 encode
  encode64(buff: any): any {
    return btoa(
      new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), '')
    );
  }

  /*
    SHA-1
    SHA-256
    SHA-384
    SHA-512
*/
  hash(algo: string, str: string): any {
    return crypto.subtle.digest(algo, new TextEncoder().encode(str));
  }
}
