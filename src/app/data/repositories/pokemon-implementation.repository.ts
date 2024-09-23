import { map, Observable, take, tap } from 'rxjs';
import {
  PokemonGetModel,
  PokemonModel,
} from '../../domain/models/pokemon.model';
import { PokemonRepository } from '../../domain/repositories/pokemon.repository';
import { inject, Injectable } from '@angular/core';
import { PokemonMapper } from '../mappers/pokemon.mapper';
import { Apollo, gql } from 'apollo-angular';
import { GetPokemonMapper } from '../mappers/get-pokemon.mapper';

@Injectable({
  providedIn: 'root',
})
export class PokemonImplementationRepository extends PokemonRepository {
  pokemonMapper = inject(PokemonMapper);
  getPokemonMapper = inject(GetPokemonMapper);
  apollo = inject(Apollo);

  constructor() {
    super();
  }

  private readonly GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        results {
          id
          url
          name
          image
        }
      }
    }
  `;

  private readonly GET_POKEMON = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        height
        order
        status
        sprites {
          front_default
        }
        moves {
          move {
            name
          }
        }
        types {
          type {
            name
          }
        }
      }
    }
  `;

  override getPokemons(
    offset: number,
    limit: number
  ): Observable<PokemonModel[]> {
    const result = this.apollo
      .watchQuery<any>({
        query: this.GET_POKEMONS,
        variables: { limit, offset },
      })
      .valueChanges.pipe(
        map((result) =>
          result.data.pokemons.results.map(this.pokemonMapper.mapFrom)
        )
      );

    return result;
  }

  override getPokemon(name: string): Observable<PokemonGetModel> {
    const result = this.apollo
      .watchQuery<any>({
        query: this.GET_POKEMON,
        variables: { name },
      })
      .valueChanges.pipe(
        map((result) => this.getPokemonMapper.mapFrom(result.data.pokemon))
      );

    return result;
  }
}
