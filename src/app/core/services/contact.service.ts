import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactForm } from '../../common/models/interfaces/contact-form.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  endpointURL: string =
    'https://niemann-moebelplaner.de/backend/kontakt/sendMail';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {}

  sendEmail(contact: ContactForm): Observable<[boolean, string | undefined]> {
    return this.http.post<[boolean, string | undefined]>(
      this.endpointURL,
      contact,
      this.httpOptions
    );
  }
}
