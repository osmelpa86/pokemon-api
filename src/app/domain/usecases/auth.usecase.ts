import { Observable } from 'rxjs';
import { UseCase } from '../../core/base/user-case';
import { inject, Injectable } from '@angular/core';
import { Auth, AuthResponse } from '../models/auth.model';
import { HttpResponse } from '@angular/common/http';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthUseCase implements UseCase<Auth, HttpResponse<AuthResponse>> {
  authRepository = inject(AuthRepository);

  execute(auth: Auth): Observable<HttpResponse<AuthResponse>> {
    return this.authRepository.login(auth);
  }
}
