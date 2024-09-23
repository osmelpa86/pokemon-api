import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { PokemonImplementationRepository } from './pokemon-implementation.repository';
import { PokemonMapper } from '../mappers/pokemon.mapper';
import { GetPokemonMapper } from '../mappers/get-pokemon.mapper';
import { gql } from 'apollo-angular';
import {
  PokemonGetModel,
} from '../../domain/models/pokemon.model';

class MockApollo {
  watchQuery = jasmine.createSpy().and.callFake(() => ({
    valueChanges: of({
      data: {
        pokemons: {
          results: [{ id: 1, url: 'url1', name: 'Pokemon1', image: 'image1' }],
        },
      },
    }),
  }));
}

class MockPokemonMapper {
  mapFrom = jasmine.createSpy();
}

class MockGetPokemonMapper {
  mapFrom = jasmine.createSpy();
}

describe('PokemonImplementationRepository', () => {
  let service: PokemonImplementationRepository;
  let apollo: Apollo;
  let pokemonMapper: PokemonMapper;
  let getPokemonMapper: GetPokemonMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonImplementationRepository,
        { provide: Apollo, useClass: MockApollo },
        { provide: PokemonMapper, useClass: MockPokemonMapper },
        { provide: GetPokemonMapper, useClass: MockGetPokemonMapper },
      ],
    });

    service = TestBed.inject(PokemonImplementationRepository);
    apollo = TestBed.inject(Apollo);
    pokemonMapper = TestBed.inject(PokemonMapper);
    getPokemonMapper = TestBed.inject(GetPokemonMapper);
  });

  afterEach(() => {
    (pokemonMapper as any).mapFrom.calls.reset();
    (getPokemonMapper as any).mapFrom.calls.reset();
  });

  it('should return a list of pokemons', () => {
    const mockData = [
      {
        id: 1,
        url: 'url1',
        name: 'Pokemon1',
        image: 'image1',
      },
    ];

    (apollo.watchQuery as jasmine.Spy).and.returnValue({
      valueChanges: of({
        data: {
          pokemons: {
            results: mockData,
          },
        },
      }),
    });

    (pokemonMapper as any).mapFrom.and.callFake((pokemon: any) => pokemon);

    service.getPokemons(0, 5).subscribe((pokemons) => {
      expect(pokemons).toEqual(mockData);
    });
  });

  it('should map pokemon data correctly', () => {
    const mockData = {
      id: 1,
      name: 'Pokemon1',
      height: 10,
      order: 1,
      status: true,
      sprites: { front_default: 'sprite_url' },
      moves: [{ move: { name: 'tackle' } }],
      types: [{ type: { name: 'grass' } }],
    };

    (apollo.watchQuery as jasmine.Spy).and.returnValue({
      valueChanges: of({
        data: {
          pokemon: mockData,
        },
      }),
    });

    (getPokemonMapper as any).mapFrom.and.returnValue(
      mockData as PokemonGetModel
    );

    service.getPokemon('pokemon1').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockData);
    });
  });
});
