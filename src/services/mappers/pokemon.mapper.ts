import { Pokemon } from "../../models";

import { PokemonDto } from "./pokemon.dto";
import { mapPokemonResourceLink } from "./pokemon-resource-link.mapper";

export function mapPokemons(data: PokemonDto[]): Pokemon[] {
  return data.map((pokemonDto) => mapPokemonResourceLink(pokemonDto));
}
