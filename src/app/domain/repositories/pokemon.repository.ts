import { Observable } from 'rxjs';
import { PokemonGetModel, PokemonModel } from '../models/pokemon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class PokemonRepository {
  abstract getPokemons(
    offset: number,
    limit: number
  ): Observable<PokemonModel[]>;

  abstract getPokemon(name: string): Observable<PokemonGetModel>;
}
