import { Mapper } from '../../core/base/mapper';
import { PokemonEntity } from '../entities/pokemon-entity';
import { PokemonModel } from '../../domain/models/pokemon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonMapper extends Mapper<PokemonEntity, PokemonModel> {
  override mapFrom(pokemonEntity: PokemonEntity): PokemonModel {
    return {
      id: pokemonEntity.id,
      url: pokemonEntity.url,
      name: pokemonEntity.name,
      image: pokemonEntity.image,
    };
  }
  override mapTo(pokemonModel: PokemonModel): PokemonEntity {
    return {
      id: pokemonModel.id,
      url: pokemonModel.url,
      name: pokemonModel.name,
      image: pokemonModel.image,
    };
  }
}
