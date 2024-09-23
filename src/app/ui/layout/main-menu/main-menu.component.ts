import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar color="primary" class="main-menu-toolbar">
      <nav class="main-menu-nav">
        <a
          mat-button
          [ngClass]="{
            'active-menu-item': isAnyActiveRoute([
              '/pokemon/pokemon-detail',
              '/pokemon/list'
            ])
          }"
          routerLink="/pokemon/list"
        >
          Pokemon
        </a>
      </nav>
    </mat-toolbar>
  `,
  styleUrl: './main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
  router = inject(Router);

  isAnyActiveRoute(routes: string[]): boolean {
    return routes.includes(this.router.url);
  }
}
