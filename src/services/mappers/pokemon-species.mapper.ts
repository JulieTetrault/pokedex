import { PokemonSpecies } from "../../models";

import { getIdFormUrl } from "./pokemon-resource-link.mapper";
import { PokemonSpeciesDto } from "./pokemon-species.dto";

export const mapPokemonSpecies = (data: PokemonSpeciesDto): PokemonSpecies => ({
  evolutionChainId: getIdFormUrl(data.evolution_chain.url),
});
