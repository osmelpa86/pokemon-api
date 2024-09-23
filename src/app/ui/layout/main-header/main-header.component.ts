import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { CacheStorageService } from '../../../core/util/cache-storage.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        class="main-mobile-menu-button"
        [matMenuTriggerFor]="mobileMenu"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <mat-menu #mobileMenu="matMenu">
        <button
          mat-menu-item
          routerLinkActive="active-menu-item"
          routerLink="/pokemon/list"
        >
          Pokemon
        </button>

        <button mat-menu-item (click)="logout()">Logout</button>
      </mat-menu>

      <div class="main-logo-container">
        <img src="../../../../assets/logo.png" alt="Logo" class="main-logo" />
        <span class="main-title">Pokemon Api</span>
      </div>

      <span class="spacer"></span>

      <img
        [matMenuTriggerFor]="userMenu"
        matRipple
        [matRippleCentered]="true"
        [matRippleUnbounded]="true"
        [matRippleRadius]="24"
        src="../../../../assets/user-avatar.png"
        alt="User Avatar"
        class="user-login-menu"
      />

      <mat-menu #userMenu="matMenu">
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  router = inject(Router);
  cacheStorageService = inject(CacheStorageService);
  logout() {
    this.cacheStorageService.clear();
    this.router.navigate(['/login'], { replaceUrl: true }).then();
  }
}
