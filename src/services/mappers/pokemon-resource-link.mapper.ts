import { PokemonResourceLink } from "../../models";

import { PokemonResourceLinkDto } from "./pokemon-resource-link.dto";

export const getIdFormUrl = (url: string): string => {
  const urlSegments = url.split("/");
  return urlSegments[urlSegments.length - 2];
};

export const mapPokemonResourceLink = (
  dto: PokemonResourceLinkDto
): PokemonResourceLink => ({
  id: getIdFormUrl(dto.url),
  name: dto.name,
  url: dto.url,
});
