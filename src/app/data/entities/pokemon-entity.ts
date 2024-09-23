export interface PokemonEntity {
  id: number;
  url: string;
  name: string;
  image: string;
}

export interface PokemonGetEntity {
  id: number;
  name: string;
  height: number;
  order: number;
  status: boolean;
  sprites: PokemonSprite;
  moves: PokemonMove[];
  types: PokemonType[];
}

export interface PokemonSprite {
  front_default: string;
}

export interface PokemonMove {
  move: Move;
}

export interface Move {
  name: string;
}

export interface PokemonType {
  type: Type;
}

export interface Type {
  name: string;
}

var asd:string
