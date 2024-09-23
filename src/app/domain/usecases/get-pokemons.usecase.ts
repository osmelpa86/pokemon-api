import { Observable } from 'rxjs';
import { UseCase } from '../../core/base/user-case';
import { PokemonModel } from '../models/pokemon.model';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonsUseCase
  implements UseCase<{ offset: number; limit: number }, PokemonModel[]>
{
  pokemonRepository = inject(PokemonRepository);

  execute(params: {
    offset: number;
    limit: number;
  }): Observable<PokemonModel[]> {
    return this.pokemonRepository.getPokemons(params.offset, params.limit);
  }
}
