import { Mapper } from '../../core/base/mapper';
import { PokemonGetEntity } from '../entities/pokemon-entity';
import { PokemonGetModel } from '../../domain/models/pokemon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonMapper extends Mapper<
  PokemonGetEntity,
  PokemonGetModel
> {
  override mapFrom(pokemonGetEntity: PokemonGetEntity): PokemonGetModel {
    return {
      id: pokemonGetEntity.id,
      name: pokemonGetEntity.name,
      height: pokemonGetEntity.height,
      order: pokemonGetEntity.order,
      status: pokemonGetEntity.status,
      sprites: pokemonGetEntity.sprites,
      moves: pokemonGetEntity.moves,
      types: pokemonGetEntity.types,
    };
  }
  override mapTo(pokemonGetModel: PokemonGetModel): PokemonGetEntity {
    return {
      id: pokemonGetModel.id,
      name: pokemonGetModel.name,
      height: pokemonGetModel.height,
      order: pokemonGetModel.order,
      status: pokemonGetModel.status,
      sprites: pokemonGetModel.sprites,
      moves: pokemonGetModel.moves,
      types: pokemonGetModel.types,
    };
  }
}
