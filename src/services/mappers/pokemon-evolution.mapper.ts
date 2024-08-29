import { PokemonEvolution } from "../../models";

import { PokemonEvolutionDto } from "./pokemon-evolution.dto";
import { PokemonResourceLinkDto } from "./pokemon-resource-link.dto";
import { mapPokemonResourceLink } from "./pokemon-resource-link.mapper";

const mapPokemon = (dto: PokemonResourceLinkDto): PokemonEvolution => {
  const pokemonResourceLink = mapPokemonResourceLink(dto);
  return {
    ...pokemonResourceLink,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonResourceLink.id}/`,
  };
};

const mapPokemonEvolutionChain = (
  dto: PokemonEvolutionDto[]
): PokemonEvolution[] => {
  return dto.flatMap((chainDto: PokemonEvolutionDto) => {
    const nestedEvolutions =
      chainDto.evolves_to.length > 0
        ? mapPokemonEvolutionChain(chainDto.evolves_to)
        : [];

    return [mapPokemon(chainDto.species), ...nestedEvolutions];
  });
};

export const mapPokemonEvolutions = (
  dto: PokemonEvolutionDto,
  pokemonId: string
): PokemonEvolution[] => {
  const pokemonEvolutions = [
    mapPokemon(dto.species),
    ...mapPokemonEvolutionChain(dto.evolves_to),
  ];
  const currentEvolutionIndex = pokemonEvolutions.findIndex(
    (pokemonEvolution) => pokemonEvolution.id === pokemonId
  );

  return currentEvolutionIndex !== -1
    ? pokemonEvolutions.slice(currentEvolutionIndex + 1)
    : [];
};
