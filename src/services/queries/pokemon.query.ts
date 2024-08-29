import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";

import { PokemonDetails } from "../../models";
import { PokemonService } from "../pokemon.service";

import { POKEMONS_QUERY_KEY } from "./pokemons.query";

export const POKEMON_QUERY_KEY = (pokemonId: string): [string, string] => [
  POKEMONS_QUERY_KEY,
  pokemonId,
];

export const usePokemonQuery = ({
  pokemonId,
}: {
  pokemonId?: string;
}): UseQueryResult<PokemonDetails, Error> => {
  return useQuery<PokemonDetails, DefaultError, PokemonDetails>({
    queryKey: POKEMON_QUERY_KEY(pokemonId as string),
    queryFn: () =>
      PokemonService.getPokemonDetails({
        pokemonId: pokemonId as string,
      }),
    enabled: !!pokemonId,
  });
};
