export type PokemonSpeciesDto = {
  readonly evolution_chain: EvolutionChainDto;
};

export type EvolutionChainDto = {
  readonly url: string;
};
