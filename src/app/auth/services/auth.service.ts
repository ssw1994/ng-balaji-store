import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginPayload, RegisterPayload } from '../models/auth.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload) {
    return this.http.post(environment.apiUrl + 'users/register', payload);
  }

  authenticate(payload: LoginPayload) {
    return this.http.post(environment.apiUrl + 'users/authenticate', payload);
  }
}
