import { Routes } from '@angular/router';
import { LoginComponent } from '../../ui/auth/login/login.component';
import { authGuardGuard } from '../../ui/auth/guard/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('../../ui/layout/main-container/main-container.component').then(
        (c) => c.MainContainerComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'pokemon',
        pathMatch: 'full',
      },
      {
        path: 'pokemon',
        loadChildren: () =>
          import('../../ui/pokemon/pokemon.routes').then(
            (r) => r.POKEMON_ROUTES
          ),
        canActivate: [authGuardGuard],
      },
    ],
  },
];
