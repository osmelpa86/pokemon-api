import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { authGuardGuard } from '../auth/guard/auth-guard.guard';

export const POKEMON_ROUTES: Routes = [
  {
    path: '',
    component: PokemonComponent,
    providers: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: PokemonListComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'pokemon-detail/:pokemonName',
        component: PokemonDetailsComponent,
        canActivate: [authGuardGuard],
      },
    ],
  },
];
