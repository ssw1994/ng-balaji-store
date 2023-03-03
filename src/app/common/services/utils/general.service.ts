import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<HttpResponse<any>> {
    return this.http.get(environment.apiUrl + 'common/categories', {
      observe: 'response',
    });
  }
}
