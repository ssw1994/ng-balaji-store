import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: any) {
    return this.http.post(environment.apiUrl + 'users/register', payload);
  }

  authenticate(payload: any) {
    return this.http.post(environment.apiUrl + 'users/authenticate', payload);
  }
}
