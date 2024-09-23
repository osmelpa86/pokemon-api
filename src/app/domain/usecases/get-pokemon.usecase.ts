import { Observable } from 'rxjs';
import { UseCase } from '../../core/base/user-case';
import { PokemonGetModel } from '../models/pokemon.model';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonUseCase
  implements UseCase<{ name: string }, PokemonGetModel>
{
  pokemonRepository = inject(PokemonRepository);

  execute(params: { name: string }): Observable<PokemonGetModel> {
    return this.pokemonRepository.getPokemon(params.name);
  }
}
