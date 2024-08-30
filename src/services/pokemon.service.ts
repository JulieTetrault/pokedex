import axios from "axios";

import {
  Pokemon,
  PokemonDetails,
  PokemonEvolution,
  PokemonSpecies,
} from "../models";

import {
  mapPokemonDetails,
  mapPokemonEvolutions,
  mapPokemons,
  mapPokemonSpecies,
  PokemonDetailsDto,
  PokemonDto,
  PokemonEvolutionDto,
  PokemonSpeciesDto,
} from "./mappers";

class PokemonServiceImpl {
  async getPokemons({
    limit = 20,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }): Promise<Pokemon[]> {
    const response = await axios.get<{ results: PokemonDto[] }>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );

    return mapPokemons(response.data.results);
  }

  async getPokemonDetails({
    pokemonId,
  }: {
    pokemonId: string;
  }): Promise<PokemonDetails> {
    const response = await axios.get<PokemonDetailsDto>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    return mapPokemonDetails(response.data);
  }

  async getPokemonSpecies({
    pokemonId,
  }: {
    pokemonId: string;
  }): Promise<PokemonSpecies> {
    const response = await axios.get<PokemonSpeciesDto>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );

    return mapPokemonSpecies(response.data);
  }

  async getPokemonEvolutions({
    pokemonId,
    evolutionChainId,
  }: {
    pokemonId: string;
    evolutionChainId: string;
  }): Promise<PokemonEvolution[]> {
    const response = await axios.get<{ chain: PokemonEvolutionDto }>(
      `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}`
    );

    return mapPokemonEvolutions(response.data.chain, pokemonId);
  }
}

export const PokemonService = new PokemonServiceImpl();
