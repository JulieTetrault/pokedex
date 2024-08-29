import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";

import { PokemonEvolution } from "../../models";
import { PokemonService } from "../pokemon.service";

export const POKEMON_EVOLUTIONS_QUERY_KEY = (
  pokemonId: string,
  evolutionChainId: string
): [string, string] => [
  "pokemon-evolutions",
  `${pokemonId}-${evolutionChainId}`,
];

export const usePokemonEvolutionsQuery = ({
  pokemonId,
  evolutionChainId,
}: {
  pokemonId?: string;
  evolutionChainId?: string;
}): UseQueryResult<PokemonEvolution[], Error> => {
  return useQuery<PokemonEvolution[], DefaultError, PokemonEvolution[]>({
    queryKey: POKEMON_EVOLUTIONS_QUERY_KEY(
      pokemonId as string,
      evolutionChainId as string
    ),
    queryFn: () =>
      PokemonService.getPokemonEvolutions({
        pokemonId: pokemonId as string,
        evolutionChainId: evolutionChainId as string,
      }),
    enabled: !!pokemonId && !!evolutionChainId,
  });
};
