import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthUseCase } from '../../../domain/usecases/auth.usecase';
import { jwtDecode } from 'jwt-decode';
import { TokenResponse } from '../../../domain/models/auth.model';
import { TokenStorageService } from '../../../core/util/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CapitalizePipe } from '../../../core/commons/pipes/capitalize.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CapitalizePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CapitalizePipe],
})
export class LoginComponent {
  hide = true;
  date = new Date();
  loginForm: any;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  authUseCase = inject(AuthUseCase);
  tokenStorageService = inject(TokenStorageService);
  private snackBar = inject(MatSnackBar);
  capitalizePipe = inject(CapitalizePipe);

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  send() {
    this.authUseCase.execute(this.loginForm.value).subscribe({
      next: (response) => {
        const token = response.body?.token;
        if (token) {
          const data: TokenResponse = jwtDecode(token);
          this.tokenStorageService.saveToken(token);
          this.tokenStorageService.saveUser(data.user);
        }
      },
      complete: () => {
        this.redirect();
      },
      error: (error) => {
        const errorResponse = error.error;
        this.snackBar.open(this.capitalizePipe.transform(errorResponse), '', {
          duration: 5000,
        });
      },
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  redirect() {
    this.router.navigate(['/pokemon/list'], { replaceUrl: true }).then();
  }
}
