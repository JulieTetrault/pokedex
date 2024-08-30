import React, { useMemo } from "react";

import { useLocalSearchParams } from "expo-router";

import { PageContainer, PokemonDetails } from "../../../src/components";
import {
  usePokemonEvolutionsQuery,
  usePokemonQuery,
  usePokemonSpeciesQuery,
} from "../../../src/services/queries";

const PokemonDetailScreen: React.FC = () => {
  const { pokemonId } = useLocalSearchParams();
  const { data: pokemon, isLoading: isPokemonLoading } = usePokemonQuery({
    pokemonId: pokemonId as string,
  });
  const { data: pokemonSpecies, isLoading: isPokemonSpeciesLoading } =
    usePokemonSpeciesQuery({
      pokemonId: pokemonId as string,
    });
  const { data: pokemonEvolutions, isLoading: isPokemonEvolutionsLoading } =
    usePokemonEvolutionsQuery({
      pokemonId: pokemonId as string,
      evolutionChainId: pokemonSpecies?.evolutionChainId,
    });

  const isLoading = useMemo(() => {
    return (
      isPokemonLoading || isPokemonSpeciesLoading || isPokemonEvolutionsLoading
    );
  }, [isPokemonLoading, isPokemonSpeciesLoading, isPokemonEvolutionsLoading]);

  return (
    <PageContainer
      title={pokemon?.name}
      imageUri={pokemon?.image}
      isLoading={isLoading}
    >
      {pokemon && pokemonSpecies && pokemonEvolutions && (
        <PokemonDetails
          types={pokemon.types}
          moves={pokemon.moves}
          evolutions={pokemonEvolutions}
        />
      )}
    </PageContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default PokemonDetailScreen;
