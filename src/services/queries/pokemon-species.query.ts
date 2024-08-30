import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";

import { PokemonSpecies } from "../../models";
import { PokemonService } from "../pokemon.service";

export const POKEMON_SPECIES_QUERY_KEY = (
  pokemonId: string
): [string, string] => ["pokemon-species", pokemonId];

export const usePokemonSpeciesQuery = ({
  pokemonId,
}: {
  pokemonId?: string;
}): UseQueryResult<PokemonSpecies, Error> => {
  return useQuery<PokemonSpecies, DefaultError, PokemonSpecies>({
    queryKey: POKEMON_SPECIES_QUERY_KEY(pokemonId as string),
    queryFn: () =>
      PokemonService.getPokemonSpecies({
        pokemonId: pokemonId as string,
      }),
    enabled: !!pokemonId,
  });
};
