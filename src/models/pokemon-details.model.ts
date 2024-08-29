import { PokemonResourceLink } from "./pokemon-resource-link.model";

export type PokemonType = {
  color: string;
} & PokemonResourceLink;

export type PokemonMove = PokemonResourceLink;

export type PokemonDetails = {
  readonly id: number;
  readonly name: string;
  readonly types: PokemonType[];
  readonly moves: PokemonMove[];
  readonly image: string;
};
