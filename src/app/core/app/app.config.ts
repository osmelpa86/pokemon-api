import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from '../route/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from '../graphql/graphql.provider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PokemonRepository } from '../../domain/repositories/pokemon.repository';
import { PokemonImplementationRepository } from '../../data/repositories/pokemon-implementation.repository';
import { environment } from '../../../environments/environment';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthImplementationRepository } from '../../data/repositories/auth-implementation.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(),
    graphqlProvider,
    provideAnimationsAsync(),
    { provide: PokemonRepository, useClass: PokemonImplementationRepository },
    { provide: AuthRepository, useClass: AuthImplementationRepository },
  ],
};

const api = environment.apiUrlLogin;
export const apiConfig = {
  url: {
    auth: {
      login: `${api}/auth/login`,
      logout: `${api}/auth/logout`,
    },
  },
  searchRequestTime: 500,
};
