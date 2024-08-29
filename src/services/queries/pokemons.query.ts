import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { Pokemon } from "../../models";
import { PokemonService } from "../pokemon.service";

export const POKEMONS_QUERY_KEY = "pokemons";
export const PAGE_SIZE = 20;

export const usePokemonsQuery = (): UseInfiniteQueryResult<
  InfiniteData<Pokemon, number>,
  Error
> => {
  return useInfiniteQuery<
    Pokemon[],
    DefaultError,
    InfiniteData<Pokemon, number>,
    string[],
    number
  >({
    queryKey: [POKEMONS_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      PokemonService.getPokemons({
        limit: PAGE_SIZE,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.length * PAGE_SIZE,
  });
};
