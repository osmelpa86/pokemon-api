import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { Observable } from 'rxjs';
import { Auth, AuthResponse } from '../../domain/models/auth.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { apiConfig } from '../../core/app/app.config';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

const httpOptions = {
  headers: httpHeaders,
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  private http = inject(HttpClient);

  constructor() {
    super();
  }

  override login(auth: Auth): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${apiConfig.url.auth.login}`,
      auth,
      httpOptions
    );
  }
}
