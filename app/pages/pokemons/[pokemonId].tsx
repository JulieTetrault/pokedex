import React from "react";
import { ActivityIndicator } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { PokemonDetails } from "../../../src/components";
import PageContainer from "../../../src/components/page-container";
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

  return (
    <PageContainer title={pokemon?.name} image={pokemon?.image}>
      {(isPokemonLoading ||
        isPokemonSpeciesLoading ||
        isPokemonEvolutionsLoading) && <ActivityIndicator />}
      {!isPokemonLoading &&
        !isPokemonSpeciesLoading &&
        !isPokemonEvolutionsLoading &&
        pokemon &&
        pokemonSpecies &&
        pokemonEvolutions && (
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
