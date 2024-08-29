import { PokemonDetails, PokemonMove, PokemonType } from "../../models";
import { PokemonTypeColors } from "../../utils/pokemonTypeColors";

import {
  PokemonDetailsDto,
  PokemonMoveDto,
  PokemonTypeDto,
} from "./pokemon-details.dto";
import { mapPokemonResourceLink } from "./pokemon-resource-link.mapper";

const mapPokemonTypeColor = (type: string): string =>
  PokemonTypeColors[type] ?? PokemonTypeColors.unknown;

const mapPokemonType = (dto: PokemonTypeDto): PokemonType => ({
  ...mapPokemonResourceLink(dto.type),
  color: mapPokemonTypeColor(dto.type.name),
});

const mapPokemonMove = (dto: PokemonMoveDto): PokemonMove =>
  mapPokemonResourceLink(dto.move);

export const mapPokemonDetails = (dto: PokemonDetailsDto): PokemonDetails => ({
  id: dto.id,
  name: dto.name,
  types: dto.types.map(mapPokemonType),
  moves: dto.moves.map(mapPokemonMove).slice(0, 15),
  image: dto.sprites.front_default,
});
