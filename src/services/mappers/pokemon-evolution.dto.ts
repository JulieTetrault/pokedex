import { PokemonResourceLinkDto } from "./pokemon-resource-link.dto";

export type PokemonEvolutionDto = {
  readonly evolves_to: PokemonEvolutionDto[];
  readonly species: PokemonResourceLinkDto;
};
