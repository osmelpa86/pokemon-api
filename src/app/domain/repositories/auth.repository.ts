import { Injectable } from '@angular/core';
import { Auth, AuthResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthRepository {
  abstract login(auth: Auth): Observable<HttpResponse<AuthResponse>>;
}
