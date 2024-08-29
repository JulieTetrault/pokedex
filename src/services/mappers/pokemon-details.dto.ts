import { PokemonResourceLinkDto } from "./pokemon-resource-link.dto";

export type PokemonDetailsDto = {
  readonly id: number;
  readonly name: string;
  readonly types: PokemonTypeDto[];
  readonly moves: PokemonMoveDto[];
  readonly sprites: PokemonSprites;
};

export type PokemonMoveDto = {
  readonly move: PokemonResourceLinkDto;
};

export type PokemonTypeDto = {
  readonly type: PokemonResourceLinkDto;
};

export type PokemonSprites = {
  readonly front_default: string;
};
